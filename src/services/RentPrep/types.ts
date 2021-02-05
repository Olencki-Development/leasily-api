export type RequestParameters = {
  postbackUri: string
  postback_password?: string
  postback_username?: string
  referenceId?: string
  referenceText?: string
  sendCustomerReceipt?: boolean
}

export type RentPrepConfig = {
  isProd: boolean
  apiKey: string
}

export type AvailablePackages =
  | 'Basic'
  | 'Pro'
  | 'Platinum'
  | 'CorpWithCredit'
  | 'CorpCreditOnly'

export type CreditCardType = 'visa' | 'amex' | 'discover' | 'mastercard'

export type CreditCard = {
  cardNumber: string
  cardSecurity: string
  cardType: CreditCardType
  expireMonth: string
  expireYear: string
}

export type Customer = {
  CreditCard: CreditCard
  IPAddress: string
  billingCity: string
  billingState: string
  billingStreetAddress: string
  billingZip: string
  company?: string
  emailAddress: string
  firstName: string
  lastName: string
  phone?: string
  referenceId: string
}

export type LandlordInfo = {
  comments?: string
  emailAddress?: string
  fax?: string
  firstName: string
  lastName: string
  phone: string
  postalCode: string
  state: string
  streetAddress: string
  city: string
}

export type BackgroundCheckForm = {
  PackageName: AvailablePackages
  Customer: Customer
  Applicant: {
    dateOfBirth: string // yyyy-mm-dd
    emailAddress?: string
    fax?: string
    firstName: string
    lastName: string
    middleName?: string
    phone: string
    postalCode: string
    ssn: string // 121-72-1111
    state: string
    streetAddress: string
    city: string
  }
  CurrentLandlord: LandlordInfo
  Employer: {
    companyName: string
    phone: string
    supervisorFirstName: string
    supervisorLastName: string
  }
  PreviousLandlord: LandlordInfo
  RequestParameters: RequestParameters
}
