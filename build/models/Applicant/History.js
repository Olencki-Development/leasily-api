"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistorySchema = void 0;
const mongoose_1 = require("mongoose");
const Pet_1 = require("./Pet");
exports.HistorySchema = new mongoose_1.Schema({
    ssn: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    pets: {
        type: [Pet_1.PetSchema],
        default: []
    },
    emergencyContacts: {
        type: [String],
        required: true
    },
    isSmoker: {
        type: Boolean,
        default: false
    },
    residences: {
        current: {
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
            start: {
                type: Date,
                required: true
            },
            reasonForLeaving: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true
            },
            reference: {
                name: {
                    type: String,
                    required: true
                },
                phone: {
                    type: String,
                    required: true
                }
            }
        },
        previous: {
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
            start: {
                type: Date,
                required: true
            },
            end: {
                type: Date,
                required: true
            },
            reasonForLeaving: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true
            },
            reference: {
                name: {
                    type: String,
                    required: true
                },
                phone: {
                    type: String,
                    required: true
                }
            }
        }
    },
    credit: {
        hasDeclaredBankruptcy: {
            type: Boolean,
            default: false
        },
        hasPreviousEviction: {
            type: Boolean,
            default: false
        },
        hasLatePayments: {
            type: Boolean,
            default: false
        },
        hasRefusedToPayRent: {
            type: Boolean,
            default: false
        },
        reasonForRefusalOfRent: {
            type: String,
            default: null
        }
    },
    employment: {
        status: {
            type: String,
            enum: ['Full Time', 'Part Time', 'Student', 'Umemployed'],
            required: true
        },
        employer: {
            type: String,
            default: null
        },
        start: {
            type: Date,
            default: null
        },
        position: {
            type: String,
            default: null
        },
        supervisor: {
            name: {
                type: String,
                default: null
            },
            phone: {
                type: String,
                default: null
            }
        },
        salary: {
            amount: {
                type: Number,
                default: null
            },
            interval: {
                type: String,
                enum: [
                    'weekly', 'bi-weekly', 'monthly', 'yearly'
                ],
                default: null
            }
        },
        additionalIncome: {
            amount: {
                type: Number,
                default: null
            },
            interval: {
                type: String,
                enum: [
                    'weekly', 'bi-weekly', 'monthly', 'yearly'
                ],
                default: null
            }
        }
    }
}, {
    timestamps: true
});
//# sourceMappingURL=History.js.map