"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../../container");
const Unauthorized_1 = require("../../errors/Unauthorized");
class Auth {
    async register(form) {
        const User = container_1.default.make('models').User;
        return User.create(form);
    }
    async login(form) {
        const User = container_1.default.make('models').User;
        const user = await User.findOne({
            email: form.email
        });
        if (!user) {
            throw new Unauthorized_1.default();
        }
        return user;
    }
    async verify(form) {
        const User = container_1.default.make('models').User;
        const user = await User.findOne({
            email: form.email
        });
        if (!user) {
            throw new Unauthorized_1.default();
        }
        return user;
    }
}
//# sourceMappingURL=index.js.map