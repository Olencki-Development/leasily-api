"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phone = void 0;
const joi_1 = require("joi");
exports.phone = joi_1.default.string().trim().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Invalid phone number');
//# sourceMappingURL=index.js.map