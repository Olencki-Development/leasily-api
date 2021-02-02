"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LeasilyError_1 = require("./LeasilyError");
class ApplicationResolvedError extends LeasilyError_1.default {
    constructor() {
        super('A decision has already been made for this application. Unable to modify the application.', 400);
    }
}
exports.default = ApplicationResolvedError;
//# sourceMappingURL=ApplicationResolvedError.js.map