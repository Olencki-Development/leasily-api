"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const joiPhone = require("joi-phone-number");
const customJoi = Joi.extend(joiPhone);
exports.default = customJoi;
//# sourceMappingURL=index.js.map