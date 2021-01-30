"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertySchema = void 0;
const mongoose_1 = require("mongoose");
exports.PropertySchema = new mongoose_1.Schema({
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipcode: {
            type: String,
            required: true
        }
    },
    unit: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});
//# sourceMappingURL=Property.js.map