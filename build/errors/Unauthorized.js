"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LeasilyError_1 = require("./LeasilyError");
class UnauthorizedError extends LeasilyError_1.default {
    constructor() {
        super('Unauthorized.', 401);
    }
}
exports.default = UnauthorizedError;
//# sourceMappingURL=Unauthorized.js.map