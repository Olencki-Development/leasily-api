"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../../../../container");
const Email_1 = require("../../../Email");
const Application_1 = require("../../../../models/Application");
const ApplicationResolvedError_1 = require("../../../../errors/ApplicationResolvedError");
const NotFoundError_1 = require("../../../../errors/NotFoundError");
class ApplicationDecision {
    constructor() {
        this._email = container_1.default.make(Email_1.default);
    }
    async approve(form) {
        const Landlord = container_1.default.make('models').Landlord;
        const landlord = await Landlord.findOne({
            user: form.user,
            application: form.applicationId
        })
            .populate('application')
            .exec();
        if (!landlord) {
            throw new NotFoundError_1.default();
        }
        const application = landlord.application;
        if (this._hasDecisionBeenMade(application)) {
            throw new ApplicationResolvedError_1.default();
        }
        application.stage = Application_1.APPLICATION_STAGES.RENTED;
        const applicants = await this._getApplicants(application);
        for (const applicant of applicants) {
            await this._sendApprovedEmail(application, applicant);
        }
        return application.save();
    }
    async decline(form) {
        const Landlord = container_1.default.make('models').Landlord;
        const landlord = await Landlord.findOne({
            user: form.user,
            application: form.applicationId
        })
            .populate('application')
            .exec();
        if (!landlord) {
            throw new NotFoundError_1.default();
        }
        const application = landlord.application;
        if (this._hasDecisionBeenMade(application)) {
            throw new ApplicationResolvedError_1.default();
        }
        application.isClosed = true;
        const applicants = await this._getApplicants(application);
        for (const applicant of applicants) {
            await this._sendDeclinedEmail(application, applicant);
        }
        return application.save();
    }
    _hasDecisionBeenMade(application) {
        if (application.isClosed) {
            return true;
        }
        if (application.stage >= Application_1.APPLICATION_STAGES.RENTED) {
            return true;
        }
        return false;
    }
    _getApplicants(application) {
        const Applicant = container_1.default.make('models').Applicant;
        return Applicant.find({
            application
        }).exec();
    }
    async _sendDeclinedEmail(application, applicant) {
        await this._email.send({
            email: applicant.user.email,
            subject: `Application for ${application.property.address.street}`,
            body: `
        Your application for:
        ${application.property.address.street}
        ${application.property.address.city}, ${application.property.address.state} ${application.property.address.zipcode}

        has been declined. Should you choose to rent with this owner/agency in the future, please re-apply.
      `
        });
    }
    async _sendApprovedEmail(application, applicant) {
        await this._email.send({
            email: applicant.user.email,
            subject: `Application for ${application.property.address.street}`,
            body: `
        Your application for:
        ${application.property.address.street}
        ${application.property.address.city}, ${application.property.address.state} ${application.property.address.zipcode}

        has been approved. You should reach out to the owner/agency for next steps in the renting process.
      `
        });
    }
}
exports.default = ApplicationDecision;
//# sourceMappingURL=index.js.map