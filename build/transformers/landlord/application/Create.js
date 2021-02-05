"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../../../services/validation");
class ApplicationCreateTransformer {
    in(payload) {
        const schema = validation_1.default.object({
            property: validation_1.default.object({
                address: validation_1.default.address.required(),
                unit: validation_1.default.string().allow(null).trim().required()
            }).required(),
            lease: validation_1.default.object({
                securityDeposit: validation_1.default.object({
                    amount: validation_1.default.number().min(1).required()
                }).required(),
                rent: validation_1.default.object({
                    amount: validation_1.default.number().min(1).required()
                }).required(),
                lengthInMonths: validation_1.default.number().min(1).required(),
                startDate: validation_1.default.date().iso().min('now').required()
            }).required(),
            applicants: validation_1.default.array().items(validation_1.default.object({
                fullName: validation_1.default.string().trim().required(),
                email: validation_1.default.string().email().trim().required(),
                phone: validation_1.default
                    .string()
                    .trim()
                    .phoneNumber({ defaultCountry: 'US', format: 'national' })
                    .required()
            }).required()).min(1).required(),
            waitPeriodInDays: validation_1.default.number().min(1).required(),
            fee: validation_1.default.number().min(0).required()
        });
        const result = schema.validate(payload);
        if (result.error) {
            throw result.error;
        }
        return result.value;
    }
    out(entities) {
        const applications = entities.map((entity) => {
            return {
                id: entity.application.id,
                property: {
                    address: {
                        street: entity.application.property.address.street,
                        city: entity.application.property.address.city,
                        state: entity.application.property.address.state,
                        zipcode: entity.application.property.address.zipcode
                    },
                    unit: entity.application.property.unit
                },
                lease: {
                    securityDeposit: {
                        amount: entity.application.lease.securityDeposit.amount,
                        hasBeenCollected: entity.application.lease.securityDeposit.hasBeenCollected
                    },
                    rent: {
                        amount: entity.application.lease.rent.amount
                    },
                    isMonthToMonth: entity.application.lease.isMonthToMonth(),
                    lengthInMonths: entity.application.lease.lengthInMonths,
                    startDate: entity.application.lease.startDate.toISOString()
                },
                applicants: entity.applicants.map((applicant) => {
                    let history = null;
                    if (applicant.history) {
                        history = {
                            ssn: applicant.history.ssn,
                            dob: applicant.history.dob.toISOString(),
                            pets: applicant.history.pets.map((pet) => {
                                return {
                                    type: pet.type,
                                    breed: pet.breed,
                                    name: pet.name
                                };
                            }),
                            emergencyContacts: applicant.history.emergencyContacts,
                            isSmoker: applicant.history.isSmoker,
                            residences: {
                                current: {
                                    address: {
                                        street: applicant.history.residences.current.address.street,
                                        city: applicant.history.residences.current.address.city,
                                        state: applicant.history.residences.current.address.state,
                                        zipcode: applicant.history.residences.current.address.zipcode
                                    },
                                    start: applicant.history.residences.current.start.toISOString(),
                                    reasonForLeaving: applicant.history.residences.current.reasonForLeaving,
                                    amount: applicant.history.residences.current.amount,
                                    reference: {
                                        name: applicant.history.residences.current.reference.name,
                                        phone: applicant.history.residences.current.reference.phone
                                    }
                                },
                                previous: {
                                    address: {
                                        street: applicant.history.residences.previous.address.street,
                                        city: applicant.history.residences.previous.address.city,
                                        state: applicant.history.residences.previous.address.state,
                                        zipcode: applicant.history.residences.previous.address.zipcode
                                    },
                                    start: applicant.history.residences.previous.start.toISOString(),
                                    end: applicant.history.residences.previous.end.toISOString(),
                                    reasonForLeaving: applicant.history.residences.previous.reasonForLeaving,
                                    amount: applicant.history.residences.previous.amount,
                                    reference: {
                                        name: applicant.history.residences.previous.reference.name,
                                        phone: applicant.history.residences.previous.reference.phone
                                    }
                                }
                            },
                            credit: {
                                hasDeclaredBankruptcy: applicant.history.credit.hasDeclaredBankruptcy,
                                hasPreviousEviction: applicant.history.credit.hasPreviousEviction,
                                hasLatePayments: applicant.history.credit.hasLatePayments,
                                hasRefusedToPayRent: applicant.history.credit.hasRefusedToPayRent,
                                reasonForRefusalOfRent: applicant.history.credit.reasonForRefusalOfRent
                            },
                            employment: {
                                status: applicant.history.employment.status,
                                employer: applicant.history.employment.employer,
                                start: applicant.history.employment.start ? applicant.history.employment.start.toISOString() : null,
                                position: applicant.history.employment.position,
                                supervisor: {
                                    name: applicant.history.employment.supervisor.name,
                                    phone: applicant.history.employment.supervisor.phone
                                },
                                salary: {
                                    amount: applicant.history.employment.salary.amount,
                                    interval: applicant.history.employment.salary.interval
                                },
                                additionalIncome: {
                                    amount: applicant.history.employment.additionalIncome.amount,
                                    interval: applicant.history.employment.additionalIncome.interval
                                }
                            }
                        };
                    }
                    return {
                        user: {
                            id: applicant.user.id,
                            fullName: applicant.user.fullName,
                            email: applicant.user.email,
                            phone: applicant.user.phone,
                            createdAt: applicant.user.createdAt.toISOString(),
                            updatedAt: applicant.user.updatedAt.toISOString()
                        },
                        history: history
                    };
                }),
                stage: entity.application.stage,
                isClosed: entity.application.isClosed,
                createdAt: entity.application.createdAt.toISOString(),
                updatedAt: entity.application.updatedAt.toISOString()
            };
        });
        return {
            applications
        };
    }
}
exports.default = ApplicationCreateTransformer;
//# sourceMappingURL=Create.js.map