"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = customJoi;
//# sourceMappingURL=index.js.map