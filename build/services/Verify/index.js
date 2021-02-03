"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Unauthorized_1 = require("../../errors/Unauthorized");
const container_1 = require("../../container");
const Email_1 = require("../Email");
class Verify {
    constructor() {
        this._codes = {};
        this._email = container_1.default.make(Email_1.default);
    }
    async requestEmail(form) {
        const code = this._getCode();
        this._setCodeForId(form.user.id, code);
        await this._sendVerifyEmail(form.user.email, code);
        return code;
    }
    validateEmail(form) {
        this._getPayloadForIdAndCode(form.user.id, form.code);
        delete this._codes[form.user.id];
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
    _setCodeForId(id, code) {
        this._codes[id] = {
            dateTime: new Date(),
            code
        };
    }
    _getPayloadForIdAndCode(id, code) {
        const payload = this._codes[id];
        if (!payload) {
            throw new Unauthorized_1.default();
        }
        if (code !== payload.code) {
            throw new Unauthorized_1.default();
        }
        const now = new Date();
        const diffInMS = now.getTime() - payload.dateTime.getTime();
        if (diffInMS > Verify.TEN_MINUTES_IN_MS) {
            throw new Unauthorized_1.default();
        }
        return payload;
    }
    async _sendVerifyEmail(email, code) {
        await this._email.send({
            email,
            subject: 'Leasily Verification Code',
            body: `
        Your Leasily verification code is:
        ${code}

        * This code will expire after 10 minutes.
      `
        });
    }
}
exports.default = Verify;
Verify.TEN_MINUTES_IN_MS = 600000;
//# sourceMappingURL=index.js.map