"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const validation_1 = require("../../../validation");
function create(form) {
    const values = validation_1.default(validation_1.validator.object({
        property: validation_1.validator
            .object({
            address: validation_1.validator.address.required(),
            unit: validation_1.validator.string().allow(null).trim().required()
        })
            .required(),
        lease: validation_1.validator
            .object({
            securityDeposit: validation_1.validator
                .object({
                amount: validation_1.validator.number().min(1).required()
            })
                .required(),
            rent: validation_1.validator
                .object({
                amount: validation_1.validator.number().min(1).required()
            })
                .required(),
            lengthInMonths: validation_1.validator.number().min(1).required(),
            startDate: validation_1.validator.date().iso().min('now').required()
        })
            .required(),
        applicants: validation_1.validator
            .array()
            .items(validation_1.validator
            .object({
            fullName: validation_1.validator.string().trim().required(),
            email: validation_1.validator.string().email().trim().required(),
            phone: validation_1.validator
                .string()
                .trim()
                .phoneNumber({ defaultCountry: 'US', format: 'national' })
                .required()
        })
            .required())
            .min(1)
            .required(),
        waitPeriodInDays: validation_1.validator.number().min(1).required(),
        fee: validation_1.validator.number().min(0).required()
    }), form);
    return values;
}
exports.create = create;
//# sourceMappingURL=validate.js.map