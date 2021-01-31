"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LeasilyError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
    }
}
exports.default = LeasilyError;
//# sourceMappingURL=LeasilyError.js.map