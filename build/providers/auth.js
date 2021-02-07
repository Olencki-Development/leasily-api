"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_1 = require("../services/Auth");
function default_1(container) {
    container.singleton(Auth_1.default, function () {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET has not been set');
        }
        return new Auth_1.default({
            secret
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=auth.js.map