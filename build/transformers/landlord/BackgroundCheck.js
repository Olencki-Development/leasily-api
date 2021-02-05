"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../../services/validation");
class BackgroundCheckTransformer {
    in(payload) {
        const schema = validation_1.default.object({
            applicationId: validation_1.default.string().trim().token().required(),
            customer: validation_1.default
                .object({
                creditCard: validation_1.default
                    .object({
                    number: validation_1.default.string().trim().creditCard().required(),
                    security: validation_1.default.string().min(3).max(4).required(),
                    type: validation_1.default
                        .string()
                        .valid('visa', 'amex', 'mastercard', 'discover')
                        .required(),
                    expiration: validation_1.default
                        .object({
                        month: validation_1.default.number().positive().max(12).required(),
                        year: validation_1.default
                            .number()
                            .min(new Date().getFullYear())
                            .required()
                    })
                        .required()
                })
                    .required(),
                billingAddress: validation_1.default.address.required(),
                ipAddress: validation_1.default
                    .string()
                    .ip({
                    version: ['ipv4']
                })
                    .required()
            })
                .required()
        });
        const result = schema.validate(payload);
        if (result.error) {
            throw result.error;
        }
        return result.value;
    }
    out() {
        return {};
    }
}
exports.default = BackgroundCheckTransformer;
//# sourceMappingURL=BackgroundCheck.js.map