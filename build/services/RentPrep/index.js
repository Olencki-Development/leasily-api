"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RentPrepError_1 = require("./RentPrepError");
class RentPrep {
    constructor(_config, _axios) {
        this._config = _config;
        this._axios = _axios;
    }
    async fetchBackgroundcheck(form) {
        const response = await this._request(form);
        if (response.status >= 400) {
            throw new RentPrepError_1.default(response);
        }
        return response.data;
    }
    _getBaseUrl(isProd) {
        if (isProd) {
            return 'https://screen.rentprep.com';
        }
        else {
            return 'https://stage.rentprep.com';
        }
    }
    _request(data) {
        const url = `${this._getBaseUrl(this._config.isProd)}/api/screen/backgroundcheck`;
        return this._axios.post(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-apiKey': this._config.apiKey
            },
            data
        });
    }
}
exports.default = RentPrep;
//# sourceMappingURL=index.js.map