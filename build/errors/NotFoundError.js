"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LeasilyError_1 = require("./LeasilyError");
class NotFoundError extends LeasilyError_1.default {
    constructor() {
        super('Not found.', 404);
    }
}
exports.default = NotFoundError;
//# sourceMappingURL=NotFoundError.js.map