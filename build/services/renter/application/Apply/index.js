"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../../../../container");
const Application_1 = require("../../../../models/Application");
const NotFoundError_1 = require("../../../../errors/NotFoundError");
class ApplicationApply {
    constructor() {
        this._email = container_1.default.make('email');
        const baseUrl = process.env.BASE_URL;
        if (!baseUrl) {
            throw new Error('BASE_URL is not set');
        }
        this._baseUrl = baseUrl;
    }
    async complete(form) {
        const Applicant = container_1.default.make('models').Applicant;
        const applicant = await Applicant.findOne({
            user: form.user,
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
            await this._notifyLandlord(application);
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
    async _notifyLandlord(application) {
        const Landlord = container_1.default.make('models').Landlord;
        const landlord = await Landlord.findOne({
            application
        }).exec();
        if (!landlord) {
            return;
        }
        await this._email.send({
            email: landlord.user.email,
            subject: `Update on Application for ${landlord.application.property.address.street}`,
            body: `
        All applicants have completed their application.
        View the completed application or request a background check at ${this._baseUrl}.
      `
        });
    }
}
exports.default = ApplicationApply;
//# sourceMappingURL=index.js.map