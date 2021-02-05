"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../../services/validation");
class LoginTransformer {
    in(payload) {
        const schema = validation_1.default.object({
            email: validation_1.default.string().email().trim().required(),
            code: validation_1.default.string().trim().length(6).required()
        });
        const result = schema.validate(payload);
        if (result.error) {
            throw result.error;
        }
        return result.value;
    }
    out(entities) {
        return {
            user: {
                id: entities.user.id,
                fullName: entities.user.fullName,
                email: entities.user.email,
                phone: entities.user.phone,
                createdAt: entities.user.createdAt.toISOString(),
                updatedAt: entities.user.updatedAt.toISOString()
            }
        };
    }
}
exports.default = LoginTransformer;
//# sourceMappingURL=Verify.js.map