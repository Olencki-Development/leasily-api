"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../../../../container");
const Auth_1 = require("../../../../services/Auth");
const Joi = require("joi");
const schema = Joi.object({
    email: Joi.string().email().trim().required(),
    code: Joi.string().length(6).required()
});
async function register(_, args) {
    const result = schema.validate(args.form);
    if (result.error) {
        throw result.error;
    }
    const auth = container_1.default.make(Auth_1.default);
    const user = await auth.verify(result.value);
    return user.toJSON();
}
exports.default = register;
//# sourceMappingURL=verify.js.map