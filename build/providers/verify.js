"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Verify_1 = require("../services/Verify");
function default_1(container) {
    container.singleton(Verify_1.default, function () {
        return new Verify_1.default();
    });
}
exports.default = default_1;
//# sourceMappingURL=verify.js.map