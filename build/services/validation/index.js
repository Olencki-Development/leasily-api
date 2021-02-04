"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phone = void 0;
const Joi = require("joi");
exports.phone = Joi.string()
    .trim()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Invalid phone number');
//# sourceMappingURL=index.js.map