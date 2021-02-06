"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const Joi = require("joi");
const joiPhone = require("joi-phone-number");
const customJoi = Joi.extend(joiPhone);
const address = customJoi.object({
    street: customJoi.string().trim().required(),
    city: customJoi.string().trim().required(),
    state: customJoi.string().trim().length(2).required(),
    zipcode: customJoi.string().trim().length(5).required()
});
customJoi.address = address;
exports.validator = customJoi;
function validate(schema, payload) {
    const result = schema.validate(payload);
    if (result.error) {
        throw result.error;
    }
    return result.value;
}
exports.default = validate;
//# sourceMappingURL=index.js.map