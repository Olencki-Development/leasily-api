"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decline = exports.approve = void 0;
const validation_1 = require("../../../validation");
function approve(form) {
    const values = validation_1.default(validation_1.validator.object({
        applicationId: validation_1.validator.string().trim().token().required()
    }), form);
    return values;
}
exports.approve = approve;
function decline(form) {
    const values = validation_1.default(validation_1.validator.object({
        applicationId: validation_1.validator.string().trim().token().required()
    }), form);
    return values;
}
exports.decline = decline;
//# sourceMappingURL=validate.js.map