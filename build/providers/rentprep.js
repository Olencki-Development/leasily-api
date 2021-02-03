"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RentPrep_1 = require("../services/RentPrep");
const axios_1 = require("axios");
function default_1(container) {
    container.instance('axios', axios_1.default);
    container.singleton(RentPrep_1.default, function () {
        const isProd = process.env.RENT_PREP_IS_PROD;
        const apiKey = process.env.RENT_PREP_API_KEY;
        if (!apiKey) {
            throw new Error('RENT_PREP_API_KEY has not been set');
        }
        const rentprep = new RentPrep_1.default({
            isProd: !!isProd,
            apiKey
        }, axios_1.default);
        return rentprep;
    });
}
exports.default = default_1;
//# sourceMappingURL=rentprep.js.map