"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LeasilyError_1 = require("./LeasilyError");
class ApplicationPendingError extends LeasilyError_1.default {
    constructor() {
        super('All applicants have not completed their portion of the application.', 400);
    }
}
exports.default = ApplicationPendingError;
//# sourceMappingURL=ApplicationPendingError.js.map