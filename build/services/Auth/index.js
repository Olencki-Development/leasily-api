"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../../container");
const Unauthorized_1 = require("../../errors/Unauthorized");
const Verify_1 = require("../Verify");
const validation_1 = require("../validation");
class Auth {
    async register(form) {
        const values = validation_1.default(validation_1.validator.object({
            fullName: validation_1.validator.string().trim().required(),
            email: validation_1.validator.string().email().trim().required(),
            phone: validation_1.validator
                .string()
                .trim()
                .phoneNumber({ defaultCountry: 'US', format: 'national' })
                .required()
        }), form);
        const User = container_1.default.make('models').User;
        const user = await User.create(values);
        const verify = container_1.default.make(Verify_1.default);
        await verify.requestEmail({
            user
        });
        return user;
    }
    async login(form) {
        const values = validation_1.default(validation_1.validator.object({
            email: validation_1.validator.string().email().trim().required()
        }), form);
        const User = container_1.default.make('models').User;
        const user = await User.findOne({
            email: values.email
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
        const values = validation_1.default(validation_1.validator.object({
            email: validation_1.validator.string().email().trim().required(),
            code: validation_1.validator.string().trim().length(6).required()
        }), form);
        const User = container_1.default.make('models').User;
        const user = await User.findOne({
            email: values.email
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