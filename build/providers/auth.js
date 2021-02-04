"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_1 = require("../services/Auth");
function default_1(container) {
    container.singleton(Auth_1.default, function () {
        return new Auth_1.default();
    });
}
exports.default = default_1;
//# sourceMappingURL=auth.js.map