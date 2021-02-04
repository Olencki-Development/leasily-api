"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Retrieve_1 = require("../services/landlord/application/Retrieve");
function default_1(container) {
    container.singleton(Retrieve_1.default, function () {
        return new Retrieve_1.default();
    });
}
exports.default = default_1;
//# sourceMappingURL=landlord.js.map