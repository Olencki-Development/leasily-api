"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
type HistoryReference {
  name: String
  phone: String
}

type HistoryResidences {
  current: HistoryResidenceCurrent!
  previous: HistoryResidencePrevious!
}

type HistoryResidenceCurrent {
  address: Address!
  start: String!
  reasonForLeaving: String!
  amount: Float!
  reference: HistoryReference!
}

type HistoryResidencePrevious {
  address: Address!
  start: String!
  end: String!
  reasonForLeaving: String!
  amount: Float!
  reference: HistoryReference!
}

type HistoryCredit {
  hasDeclaredBankruptcy: Boolean!
  hasPreviousEviction: Boolean!
  hasLatePayments: Boolean!
  hasRefusedToPayRent: Boolean!
  reasonForRefusalOfRent: String
}

type HistoryEmploymentSalary {
  amount: Float
  interval: String
}

type HistoryEmployment {
  status: String!
  employer: String
  start: String
  position: String
  supervisor: HistoryReference!
  salary: HistoryEmploymentSalary!
  additionalIncome: HistoryEmploymentSalary!
}

type History {
  ssn: String!
  dob: String!
  pets: [Pet]!
  emergencyContacts: [String!]!
  isSmoker: Boolean!
  residences: HistoryResidences!
  credit: HistoryCredit!
  employment: HistoryEmployment!
}
`;
//# sourceMappingURL=History.js.map