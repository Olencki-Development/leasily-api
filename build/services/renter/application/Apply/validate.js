"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.complete = void 0;
const validation_1 = require("../../../validation");
function complete(form) {
    const values = validation_1.default(validation_1.validator.object({
        applicationId: validation_1.validator.string().trim().token().required(),
        history: validation_1.validator.object({
            ssn: validation_1.validator.string().trim().required(),
            dob: validation_1.validator.date().iso().max('now').required(),
            pets: validation_1.validator.array().items(validation_1.validator.object({
                type: validation_1.validator.string().trim().required(),
                breed: validation_1.validator.string().trim().required(),
                name: validation_1.validator.string().trim().required()
            })).required(),
            emergencyContacts: validation_1.validator.array().items(validation_1.validator.string().trim().required()).min(2).required(),
            isSmoker: validation_1.validator.boolean().required(),
            residences: validation_1.validator.object({
                current: validation_1.validator.object({
                    address: validation_1.validator.address.required(),
                    start: validation_1.validator.date().iso().max('now').required(),
                    reasonForLeaving: validation_1.validator.string().trim().required(),
                    amount: validation_1.validator.number().min(1).required(),
                    reference: validation_1.validator.object({
                        name: validation_1.validator.string().trim().required(),
                        phone: validation_1.validator
                            .string()
                            .trim()
                            .phoneNumber({ defaultCountry: 'US', format: 'national' }).required()
                    }).required()
                }).required(),
                previous: validation_1.validator.object({
                    address: validation_1.validator.address.required(),
                    start: validation_1.validator.date().iso().max('now').required(),
                    end: validation_1.validator.date().iso().max('now').required(),
                    reasonForLeaving: validation_1.validator.string().trim().required(),
                    amount: validation_1.validator.number().min(1).required(),
                    reference: validation_1.validator.object({
                        name: validation_1.validator.string().trim().required(),
                        phone: validation_1.validator
                            .string()
                            .trim()
                            .phoneNumber({ defaultCountry: 'US', format: 'national' }).required()
                    }).required()
                }).required()
            }).required(),
            credit: validation_1.validator.object({
                hasDeclaredBankruptcy: validation_1.validator.boolean().required(),
                hasPreviousEviction: validation_1.validator.boolean().required(),
                hasLatePayments: validation_1.validator.boolean().required(),
                hasRefusedToPayRent: validation_1.validator.boolean().required(),
                reasonForRefusalOfRent: validation_1.validator.string().valid(null).required()
            }).required(),
            employment: validation_1.validator.object({
                status: validation_1.validator.string().trim().valid('Full Time', 'Part Time', 'Student', 'Unemployed').required(),
                employer: validation_1.validator.string().trim().valid(null).required(),
                start: validation_1.validator.date().iso().max('now').valid(null).required(),
                position: validation_1.validator.string().trim().valid(null).required(),
                supervisor: validation_1.validator.object({
                    name: validation_1.validator.string().trim().valid(null).required(),
                    phone: validation_1.validator.string().trim().valid(null).required()
                }).required(),
                salary: validation_1.validator.object({
                    amount: validation_1.validator.number().min(1).valid(null).required(),
                    interval: validation_1.validator.string().trim().valid(null, 'weekly', 'bi-weekly', 'monthly', 'yearly').required()
                }).required(),
                additionalIncome: validation_1.validator.object({
                    amount: validation_1.validator.number().min(1).valid(null).required(),
                    interval: validation_1.validator.string().trim().valid(null, 'weekly', 'bi-weekly', 'monthly', 'yearly').required()
                }).required()
            }).required()
        }).required()
    }), form);
    return values;
}
exports.complete = complete;
//# sourceMappingURL=validate.js.map