"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../../../../container");
class ApplicationCreate {
    constructor() {
        this._email = container_1.default.make('email');
        const baseUrl = process.env.BASE_URL;
        if (!baseUrl) {
            throw new Error('BASE_URL is not set');
        }
        this._baseUrl = baseUrl;
    }
    async create(form) {
        const Application = container_1.default.make('models')
            .Application;
        const application = await Application.create({
            property: form.property,
            lease: form.lease
        });
        const applicants = [];
        for (const applicantForm of form.applicants) {
            const applicant = await this._getApplicant(applicantForm, application);
            applicants.push(applicant);
        }
        const landlord = await this._getLandlord(application, form.user);
        return {
            application,
            applicants,
            landlord
        };
    }
    async _getApplicant(applicantForm, application) {
        const User = container_1.default.make('models').User;
        const Applicant = container_1.default.make('models').Applicant;
        const user = await User.findOneOrCreate({
            email: applicantForm.email
        }, applicantForm);
        const applicant = await Applicant.create({
            user,
            application
        });
        await this._sendApplyEmail(application, applicant);
        return applicant;
    }
    async _getLandlord(application, user) {
        const Landlord = container_1.default.make('models').Landlord;
        return Landlord.create({
            user,
            application
        });
    }
    async _sendApplyEmail(application, applicant) {
        await this._email.send({
            email: applicant.user.email,
            subject: `Application for ${application.property.address.street}`,
            body: `
        You've been invited to apply to:
        ${application.property.address.street}
        ${application.property.address.city}, ${application.property.address.state} ${application.property.address.zipcode}

        Use this link to complete the application:
        ${this._baseUrl}/apply/${applicant.id}
      `
        });
    }
}
exports.default = ApplicationCreate;
//# sourceMappingURL=index.js.map