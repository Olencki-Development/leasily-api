"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../../../../container");
const Retrieve_1 = require("../../../../services/landlord/application/Retrieve");
const ForbiddenError_1 = require("../../../../errors/ForbiddenError");
const application_1 = require("../../../../transformers/application");
async function applications(_, __, context) {
    const { user } = context;
    if (!user) {
        throw new ForbiddenError_1.default();
    }
    const retrieve = container_1.default.make(Retrieve_1.default);
    const result = await retrieve.all({
        user
    });
    return result.map((entities) => {
        return application_1.default(entities);
    });
}
exports.default = applications;
//# sourceMappingURL=applications.js.map