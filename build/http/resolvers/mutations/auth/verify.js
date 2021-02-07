"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../../../../container");
const Auth_1 = require("../../../../services/Auth");
const validate_1 = require("../../../../services/Auth/validate");
const user_1 = require("../../../../transformers/user");
async function verify(_, args) {
    const form = validate_1.verify(args.form);
    const auth = container_1.default.make(Auth_1.default);
    const { user, token } = await auth.verify(form);
    return {
        user: user_1.default({
            user
        }),
        token
    };
}
exports.default = verify;
//# sourceMappingURL=verify.js.map