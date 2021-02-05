"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../../services/validation");
class LoginTransformer {
    in(payload) {
        const schema = validation_1.default.object({
            email: validation_1.default.string().email().trim().required()
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
exports.default = LoginTransformer;
//# sourceMappingURL=Login.js.map