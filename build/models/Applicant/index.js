"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicantModel = exports.modelName = void 0;
const mongoose_1 = require("mongoose");
const History_1 = require("./History");
const User_1 = require("../User");
const Application_1 = require("../Application");
const ApplicantSchema = new mongoose_1.Schema({
    history: {
        type: History_1.HistorySchema,
        default: null
    },
    application: {
        type: mongoose_1.Types.ObjectId,
        ref: Application_1.modelName,
        required: true
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: User_1.modelName,
        required: true
    }
}, {
    timestamps: true
});
exports.modelName = 'Applicant';
exports.ApplicantModel = mongoose_1.model(exports.modelName, ApplicantSchema);
//# sourceMappingURL=index.js.map