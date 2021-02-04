"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Address_1 = require("./Address");
const Applicant_1 = require("./Applicant");
const Application_1 = require("./Application");
const History_1 = require("./History");
const Lease_1 = require("./Lease");
const Pet_1 = require("./Pet");
const Property_1 = require("./Property");
const User_1 = require("./User");
const Queries_1 = require("./Queries");
const Mutations_1 = require("./Mutations");
exports.default = `
${Address_1.default}
${Applicant_1.default}
${Application_1.default}
${History_1.default}
${Lease_1.default}
${Pet_1.default}
${Property_1.default}
${User_1.default}

${Queries_1.default}
${Mutations_1.default}
`;
//# sourceMappingURL=index.js.map