"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../../container");
const Unauthorized_1 = require("../../errors/Unauthorized");
const Verify_1 = require("../Verify");
class Auth {
    async register(form) {
        const User = container_1.default.make('models').User;
        const user = await User.create(form);
        const verify = container_1.default.make(Verify_1.default);
        await verify.requestEmail({
            user
        });
        return user;
    }
    async login(form) {
        const User = container_1.default.make('models').User;
        const user = await User.findOne({
            email: form.email
        }).exec();
        if (!user) {
            throw new Unauthorized_1.default();
        }
        const verify = container_1.default.make(Verify_1.default);
        await verify.requestEmail({
            user
        });
        return user;
    }
    async verify(form) {
        const User = container_1.default.make('models').User;
        const user = await User.findOne({
            email: form.email
        }).exec();
        if (!user) {
            throw new Unauthorized_1.default();
        }
        const verify = container_1.default.make(Verify_1.default);
        verify.validateEmail({
            user,
            code: form.code
        });
        return user;
    }
}
exports.default = Auth;
//# sourceMappingURL=index.js.map