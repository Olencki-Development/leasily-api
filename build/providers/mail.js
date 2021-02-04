"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = require("@sendgrid/mail");
const Email_1 = require("../services/Email");
function default_1(container) {
    container.instance('@sendgrid/mail', mail_1.default);
    container.singleton(Email_1.default, function () {
        const email = process.env.SUPPORT_EMAIL;
        if (!email) {
            throw new Error('SUPPORT_EMAIL not set');
        }
        const mail = container.make('@sendgrid/mail');
        return new Email_1.default(mail, email);
    });
}
exports.default = default_1;
//# sourceMappingURL=mail.js.map