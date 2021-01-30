"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaseSchema = void 0;
const mongoose_1 = require("mongoose");
exports.LeaseSchema = new mongoose_1.Schema({
    securityDeposit: {
        amount: {
            type: Number,
            required: true,
            min: 1
        },
        hasBeenCollected: {
            type: Boolean,
            default: false
        }
    },
    rent: {
        amount: {
            type: Number,
            required: true,
            min: 1
        }
    },
    lengthInMonths: {
        type: Number,
        required: true,
        min: 1
    },
    startDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});
exports.LeaseSchema.methods.isMonthToMonth = function () {
    return this.lengthInMonths === 1;
};
//# sourceMappingURL=Lease.js.map