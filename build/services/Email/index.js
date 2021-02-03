"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Email {
    constructor(_client, _fromEmail) {
        this._client = _client;
        this._fromEmail = _fromEmail;
    }
    async send(form) {
        return this._client.send({
            to: form.email,
            from: this._fromEmail,
            text: form.body,
            attachments: form.attachments
        });
    }
}
exports.default = Email;
//# sourceMappingURL=index.js.map