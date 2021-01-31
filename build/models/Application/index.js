"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationModel = exports.modelName = exports.APPLICATION_STAGES = void 0;
const mongoose_1 = require("mongoose");
const Property_1 = require("./Property");
const Lease_1 = require("./Lease");
var APPLICATION_STAGES;
(function (APPLICATION_STAGES) {
    APPLICATION_STAGES[APPLICATION_STAGES["AWAITING_COMPLETION"] = 0] = "AWAITING_COMPLETION";
    APPLICATION_STAGES[APPLICATION_STAGES["REQUESTING_BACKGROUND_CHECK"] = 1] = "REQUESTING_BACKGROUND_CHECK";
    APPLICATION_STAGES[APPLICATION_STAGES["AWAITING_APPLICATION_REVIEW"] = 2] = "AWAITING_APPLICATION_REVIEW";
    APPLICATION_STAGES[APPLICATION_STAGES["RENTED"] = 3] = "RENTED";
})(APPLICATION_STAGES = exports.APPLICATION_STAGES || (exports.APPLICATION_STAGES = {}));
const ApplicationSchema = new mongoose_1.Schema({
    property: {
        type: Property_1.PropertySchema,
        required: true
    },
    stage: {
        type: APPLICATION_STAGES,
        default: APPLICATION_STAGES.AWAITING_COMPLETION
    },
    isClosed: {
        type: Boolean,
        default: false
    },
    lease: {
        type: Lease_1.LeaseSchema,
        required: true
    }
}, {
    timestamps: true
});
exports.modelName = 'Application';
exports.ApplicationModel = mongoose_1.model(exports.modelName, ApplicationSchema);
//# sourceMappingURL=index.js.map