"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../../../../container");
const Application_1 = require("../../../../models/Application");
const NotFoundError_1 = require("../../../../errors/NotFoundError");
class ApplicationApply {
    async complete(form) {
        const Applicant = container_1.default.make('models').Applicant;
        const applicant = await Applicant.findOne({
            id: form.applicantId
        })
            .populate('application')
            .exec();
        if (!applicant) {
            throw new NotFoundError_1.default();
        }
        applicant.history = form.history;
        await applicant.save();
        const isComplete = await this._isApplicationComplete(applicant.application);
        if (isComplete) {
            const application = applicant.application;
            application.stage = Application_1.APPLICATION_STAGES.AWAITING_APPLICATION_REVIEW;
            await application.save();
        }
    }
    async _isApplicationComplete(application) {
        const Applicant = container_1.default.make('models').Applicant;
        const applicants = await Applicant.find({
            application
        }).exec();
        const isIncomplete = applicants.find((applicant) => {
            return !applicant.history;
        });
        return !isIncomplete;
    }
}
exports.default = ApplicationApply;
//# sourceMappingURL=index.js.map