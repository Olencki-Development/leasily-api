"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Unauthorized_1 = require("../../errors/Unauthorized");
class Verify {
    constructor() {
        this._codes = {};
    }
    async requestEmail(form) {
        const code = this._getCode();
        this._codes[form.user.id] = code;
        // TOOD: implement send email with code
        return code;
    }
    validateEmail(form) {
        const code = this._codes[form.user.id];
        if (code !== form.code) {
            throw new Unauthorized_1.default();
        }
        delete this._codes[form.user.id];
        // TOOD: implement token timeout check
        return true;
    }
    _getCode(length = 6) {
        let result = '';
        const characters = '0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}
exports.default = Verify;
//# sourceMappingURL=index.js.map