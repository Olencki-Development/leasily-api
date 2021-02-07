"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LeasilyError_1 = require("./LeasilyError");
class ForbiddenError extends LeasilyError_1.default {
    constructor() {
        super('Forbidden.', 403);
    }
}
exports.default = ForbiddenError;
//# sourceMappingURL=ForbiddenError.js.map