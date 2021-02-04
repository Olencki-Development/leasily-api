"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const register_1 = require("./mutations/auth/register");
const login_1 = require("./mutations/auth/login");
const verify_1 = require("./mutations/auth/verify");
const applications_1 = require("./queries/landlord/applications");
exports.default = {
    Query: {
        applications: applications_1.default
    },
    Mutation: {
        register: register_1.default,
        login: login_1.default,
        verify: verify_1.default
    }
};
//# sourceMappingURL=index.js.map