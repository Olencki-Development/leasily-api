"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const Applicant_1 = require("../models/Applicant");
const Application_1 = require("../models/Application");
const Landlord_1 = require("../models/Landlord");
function default_1(container) {
    container.singleton('models', function () {
        return {
            User: User_1.UserModel,
            Landlord: Landlord_1.LandlordModel,
            Applicant: Applicant_1.ApplicantModel,
            Application: Application_1.ApplicationModel
        };
    });
}
exports.default = default_1;
//# sourceMappingURL=models.js.map