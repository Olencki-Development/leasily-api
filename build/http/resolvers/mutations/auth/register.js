"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../../../../container");
const Auth_1 = require("../../../../services/Auth");
const Joi = require("joi");
const schema = Joi.object({
    fullName: Joi.string().trim().required(),
    email: Joi.string().email().trim().required()
});
async function register(_, args) {
    const result = schema.validate(args.form);
    if (result.error) {
        throw result.error;
    }
    const auth = container_1.default.make(Auth_1.default);
    const user = await auth.register(result.value);
    return user.toJSON();
}
exports.default = register;
//# sourceMappingURL=register.js.map