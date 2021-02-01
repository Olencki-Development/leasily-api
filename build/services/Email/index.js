"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Email {
    constructor(_client) {
        this._client = _client;
        const email = process.env.SUPPORT_EMAIL;
        if (!email) {
            throw new Error('SUPPORT_EMAIL not set');
        }
        this._fromEmail = email;
    }
    async send(form) {
        return this._client.send({
            to: form.email,
            from: this._fromEmail,
            text: form.body
        });
    }
}
exports.default = Email;
//# sourceMappingURL=index.js.map