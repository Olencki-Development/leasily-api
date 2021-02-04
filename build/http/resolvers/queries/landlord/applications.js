"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../../../../container");
const Retrieve_1 = require("../../../../services/landlord/application/Retrieve");
async function applications(_, __, context) {
    const { user } = context;
    const retrieve = container_1.default.make(Retrieve_1.default);
    const result = await retrieve.all({
        user
    });
    return result.reduce((json, item) => {
        const temp = {
            ...item.application.toJSON(),
            applicants: item.applicants.map((applicant) => applicant.toJSON())
        };
        json.push(temp);
        return json;
    }, []);
}
exports.default = applications;
//# sourceMappingURL=applications.js.map