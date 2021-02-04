"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../../../../container");
const Auth_1 = require("../../../../services/Auth");
async function register(_, args) {
    const auth = container_1.default.make(Auth_1.default);
    const user = await auth.register(args.form);
    return user.toJSON();
}
exports.default = register;
//# sourceMappingURL=register.js.map