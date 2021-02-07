"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.byId = void 0;
const validation_1 = require("../../../validation");
function byId(form) {
    const values = validation_1.default(validation_1.validator.object({
        applicationId: validation_1.validator.string().trim().token().required()
    }), form);
    return values;
}
exports.byId = byId;
//# sourceMappingURL=validate.js.map