"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
const validation_1 = require("../../validation");
function request(form) {
    const values = validation_1.default(validation_1.validator.object({
        applicationId: validation_1.validator.string().trim().token().required(),
        customer: validation_1.validator
            .object({
            creditCard: validation_1.validator
                .object({
                number: validation_1.validator.string().trim().creditCard().required(),
                security: validation_1.validator.string().min(3).max(4).required(),
                type: validation_1.validator
                    .string()
                    .valid('visa', 'amex', 'mastercard', 'discover')
                    .required(),
                expiration: validation_1.validator
                    .object({
                    month: validation_1.validator.number().positive().max(12).required(),
                    year: validation_1.validator
                        .number()
                        .min(new Date().getFullYear())
                        .required()
                })
                    .required()
            })
                .required(),
            billingAddress: validation_1.validator.address.required(),
            ipAddress: validation_1.validator
                .string()
                .ip({
                version: ['ipv4']
            })
                .required()
        })
            .required()
    }), form);
    return values;
}
exports.request = request;
//# sourceMappingURL=validate.js.map