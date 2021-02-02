import { Schema } from 'mongoose'
import { PetSchema, IPet } from './Pet'
import { LeasilyDocument } from '../plugins'

type TimeInterval = 'Full Time' | 'Part Time' | 'Student' | 'Umemployed'

export interface IHistory extends LeasilyDocument {
  ssn: string
  dob: Date
  pets: IPet[]
  emergencyContacts: string[]
  isSmoker: boolean
  residences: {
    current: {
      address: {
        street: string
        city: string
        state: string
        zipcode: string
      }
      start: Date
      reasonForLeaving: string
      amount: number
      reference: {
        name: string
        phone: string
      }
    }
    previous: {
      address: {
        street: string
        city: string
        state: string
        zipcode: string
      }
      start: Date
      end: Date
      reasonForLeaving: string
      amount: number
      reference: {
        name: string
        phone: string
      }
    }
  }
  credit: {
    hasDeclaredBankruptcy: boolean
    hasPreviousEviction: boolean
    hasLatePayments: boolean
    hasRefusedToPayRent: boolean
    reasonForRefusalOfRent: string | null
  }
  employment: {
    status: 'Full Time' | 'Part Time' | 'Student' | 'Umemployed'
    employer: string | null
    start: Date | null
    position: string | null
    supervisor: {
      name: string | null
      phone: string | null
    }
    salary: {
      amount: number | null
      interval: TimeInterval | null
    }
    additionalIncome: {
      amount: number | null
      interval: TimeInterval | null
    }
  }
}

export const HistorySchema = new Schema<IHistory>(
  {
    ssn: {
      type: String,
      required: true
    },
    dob: {
      type: Date,
      required: true
    },
    pets: {
      type: [PetSchema],
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
          enum: ['Full Time', 'Part Time', 'Student', 'Umemployed'],
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
          enum: ['Full Time', 'Part Time', 'Student', 'Umemployed'],
          default: null
        }
      }
    }
  },
  {
    timestamps: true
  }
)
