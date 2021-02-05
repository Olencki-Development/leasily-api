"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../../services/validation");
class RegisterTransformer {
    in(payload) {
        const schema = validation_1.default.object({
            fullName: validation_1.default.string().trim().required(),
            email: validation_1.default.string().email().trim().required(),
            phone: validation_1.default.string().trim().phoneNumber({ defaultCountry: 'US', format: 'national' }).required()
        });
        const result = schema.validate(payload);
        if (result.error) {
            throw result.error;
        }
        return result.value;
    }
    out() {
        return {};
    }
}
exports.default = RegisterTransformer;
//# sourceMappingURL=Register.js.map