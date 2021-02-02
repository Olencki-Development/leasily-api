"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandlordModel = exports.modelName = void 0;
const mongoose_1 = require("mongoose");
const User_1 = require("../User");
const Application_1 = require("../Application");
const LandlordSchema = new mongoose_1.Schema({
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
exports.modelName = 'Landlord';
exports.LandlordModel = mongoose_1.model(exports.modelName, LandlordSchema);
//# sourceMappingURL=index.js.map