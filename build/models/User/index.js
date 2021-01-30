"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.modelName = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    }
}, {
    timestamps: true
});
exports.modelName = 'User';
exports.UserModel = mongoose_1.model(exports.modelName, UserSchema);
//# sourceMappingURL=index.js.map