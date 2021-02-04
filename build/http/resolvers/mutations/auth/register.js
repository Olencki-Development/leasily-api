"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../../../../container");
const Auth_1 = require("../../../../services/Auth");
const joi_1 = require("joi");
const validation_1 = require("../../../../services/validation");
const schema = joi_1.default.object({
    fullName: joi_1.default.string().trim().required(),
    email: joi_1.default.string().email().trim().required(),
    phone: validation_1.phone.required()
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