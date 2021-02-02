"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RentPrepError extends Error {
    constructor(response) {
        super('Rentprep request failed with non 200');
        this.response = response;
    }
}
exports.default = RentPrepError;
//# sourceMappingURL=RentPrepError.js.map