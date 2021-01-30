"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PetSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        require: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
//# sourceMappingURL=Pet.js.map