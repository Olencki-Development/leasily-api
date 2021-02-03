"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../../../container");
const RentPrep_1 = require("../../RentPrep");
const Application_1 = require("../../../models/Application");
const ApplicationPendingError_1 = require("../../../errors/ApplicationPendingError");
const NotFoundError_1 = require("../../../errors/NotFoundError");
const Email_1 = require("../../Email");
class BackgroundCheck {
    constructor() {
        this._email = container_1.default.make(Email_1.default);
    }
    async request(form) {
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
        if (application.stage !== Application_1.APPLICATION_STAGES.AWAITING_APPLICATION_REVIEW) {
            throw new ApplicationPendingError_1.default();
        }
        const applicants = await this._getApplicants(application);
        const rentprep = container_1.default.make(RentPrep_1.default);
        for (const applicant of applicants) {
            await rentprep.fetchBackgroundcheck({
                PackageName: 'Platinum',
                Customer: {
                    CreditCard: {
                        cardType: form.customer.creditCard.type,
                        cardNumber: form.customer.creditCard.number,
                        cardSecurity: form.customer.creditCard.security,
                        expireMonth: form.customer.creditCard.expiration.month,
                        expireYear: form.customer.creditCard.expiration.year
                    },
                    IPAddress: form.customer.ipAddress,
                    billingStreetAddress: form.customer.billingAddress.street,
                    billingCity: form.customer.billingAddress.city,
                    billingState: form.customer.billingAddress.state,
                    billingZip: form.customer.billingAddress.zipcode,
                    emailAddress: form.user.email,
                    firstName: form.user.fullName.split(' ')[0],
                    lastName: form.user.fullName.split(' ')[1],
                    referenceId: landlord.id
                },
                Applicant: {
                    dateOfBirth: applicant.history.dob,
                    emailAddress: applicant.user.email,
                    firstName: applicant.user.fullName.split(' ')[0],
                    lastName: applicant.user.fullName.split(' ')[1],
                    phone: applicant.user.phone,
                    postalCode: applicant.history.residences.current.address.zipcode,
                    state: applicant.history.residences.current.address.state,
                    city: applicant.history.residences.current.address.city,
                    streetAddress: applicant.history.residences.current.address.street,
                    ssn: applicant.history.ssn
                },
                Employer: {
                    companyName: applicant.history.employment.employer || '',
                    phone: applicant.history.employment.supervisor.phone || '',
                    supervisorFirstName: (applicant.history.employment.supervisor.name || '').split(' ')[0],
                    supervisorLastName: (applicant.history.employment.supervisor.name || '').split(' ')[1]
                },
                CurrentLandlord: {
                    firstName: applicant.history.residences.current.reference.name.split(' ')[0],
                    lastName: applicant.history.residences.current.reference.name.split(' ')[1],
                    phone: applicant.history.residences.current.reference.phone,
                    postalCode: applicant.history.residences.current.address.zipcode,
                    state: applicant.history.residences.current.address.state,
                    streetAddress: applicant.history.residences.current.address.street,
                    city: applicant.history.residences.current.address.city
                },
                PreviousLandlord: {
                    firstName: applicant.history.residences.previous.reference.name.split(' ')[0],
                    lastName: applicant.history.residences.previous.reference.name.split(' ')[1],
                    phone: applicant.history.residences.previous.reference.phone,
                    postalCode: applicant.history.residences.previous.address.zipcode,
                    state: applicant.history.residences.previous.address.state,
                    streetAddress: applicant.history.residences.previous.address.street,
                    city: applicant.history.residences.previous.address.city
                },
                RequestParameters: {
                    postbackUri: '/wks/rentprep',
                    postback_password: process.env.RENT_PREP_BASIC_AUTH_PASSWORD,
                    postback_username: process.env.RENT_PREP_BASIC_AUTH_USERNAME,
                    referenceId: applicant.id,
                    sendCustomerReceipt: true
                }
            });
        }
        application.stage = Application_1.APPLICATION_STAGES.REQUESTING_BACKGROUND_CHECK;
        return application.save();
    }
    async webhookCallback(form) {
        // TODO: implement better handling of the form data
        const Landlord = container_1.default.make('models').Landlord;
        const landlord = await Landlord.findOne({
            id: form.customerReferenceId
        })
            .populate('application')
            .populate('user')
            .exec();
        if (!landlord) {
            throw new NotFoundError_1.default();
        }
        if (form.file) {
            const attachment = {
                content: form.file,
                filename: form.filename,
                type: 'application/pdf',
                disposition: 'attachment'
            };
            await this._notifyLandlord(landlord, attachment);
        }
    }
    async _getApplicants(application) {
        const Applicant = container_1.default.make('models').Applicant;
        return Applicant.find({
            application
        })
            .populate('user')
            .exec();
    }
    async _notifyLandlord(landlord, attachment) {
        await this._email.send({
            email: landlord.user.email,
            subject: `Update on Application for ${landlord.application.property.address.street}`,
            body: `
        A new version of your report is available.
      `,
            attachments: [attachment]
        });
    }
}
exports.default = BackgroundCheck;
//# sourceMappingURL=index.js.map