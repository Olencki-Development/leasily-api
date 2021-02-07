"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../../../../container");
const Auth_1 = require("../../../../services/Auth");
const validate_1 = require("../../../../services/Auth/validate");
const result_1 = require("../../../../transformers/result");
async function login(_, args) {
    const form = validate_1.login(args.form);
    const auth = container_1.default.make(Auth_1.default);
    await auth.login(form);
    return result_1.default('Validation code sent');
}
exports.default = login;
//# sourceMappingURL=login.js.map