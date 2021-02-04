export default `
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
`
