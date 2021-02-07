"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../../container");
const Unauthorized_1 = require("../../errors/Unauthorized");
const Verify_1 = require("../Verify");
const jwt = require("jsonwebtoken");
const ForbiddenError_1 = require("../../errors/ForbiddenError");
class Auth {
    constructor(_options) {
        this._options = _options;
        this._tokens = {};
    }
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
        const token = this._getToken(user);
        this._tokens[token] = user.id;
        return {
            user,
            token
        };
    }
    async validate(form) {
        const userId = this._tokens[form.token];
        if (!userId) {
            throw new ForbiddenError_1.default();
        }
        const User = container_1.default.make('models').User;
        const user = await User.findOne({
            id: userId
        }).exec();
        if (!user) {
            throw new ForbiddenError_1.default();
        }
        return user;
    }
    _getToken(user) {
        return jwt.sign({
            id: user.id,
            role: 'user'
        }, this._options.secret);
    }
}
exports.default = Auth;
//# sourceMappingURL=index.js.map