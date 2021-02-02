"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../../../../container");
class ApplicationRetrieve {
    async all(form) {
        const Landlord = container_1.default.make('models')
            .Landlord;
        const Applicant = container_1.default.make('models')
            .Applicant;
        const landlords = await Landlord.find({
            user: form.user
        })
            .populate('application')
            .exec();
        const returnValue = [];
        for (const landlord of landlords) {
            const application = landlord.application;
            const applicants = await Applicant.find({
                application
            }).populate('user').exec();
            returnValue.push({
                application,
                applicants,
                landlord
            });
        }
        return returnValue;
    }
}
exports.default = ApplicationRetrieve;
//# sourceMappingURL=index.js.map