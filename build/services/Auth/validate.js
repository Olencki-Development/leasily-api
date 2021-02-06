"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.login = exports.register = void 0;
const validation_1 = require("../validation");
function register(form) {
    const values = validation_1.default(validation_1.validator.object({
        fullName: validation_1.validator.string().trim().required(),
        email: validation_1.validator.string().email().trim().required(),
        phone: validation_1.validator
            .string()
            .trim()
            .phoneNumber({ defaultCountry: 'US', format: 'national' })
            .required()
    }), form);
    return values;
}
exports.register = register;
function login(form) {
    const values = validation_1.default(validation_1.validator.object({
        email: validation_1.validator.string().email().trim().required()
    }), form);
    return values;
}
exports.login = login;
function verify(form) {
    const values = validation_1.default(validation_1.validator.object({
        email: validation_1.validator.string().email().trim().required(),
        code: validation_1.validator.string().trim().length(6).required()
    }), form);
    return values;
}
exports.verify = verify;
//# sourceMappingURL=validate.js.map