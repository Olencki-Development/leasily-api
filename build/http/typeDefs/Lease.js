"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
type LeaseSecurityDeposit {
  amount: Float!
  hasBeenCollected: Boolean!
}

type LeaseRent {
  amount: Float!
}

type Lease {
  securityDeposit: LeaseSecurityDeposit!
  rent: LeaseRent!
  isMonthToMonth: Boolean!
  lengthInMonths: Float!
  startDate: String!
}
`;
//# sourceMappingURL=Lease.js.map