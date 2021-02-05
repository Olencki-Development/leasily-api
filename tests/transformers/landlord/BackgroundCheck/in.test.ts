import BackgroundCheck from '../../../../src/transformers/landlord/BackgroundCheck'
import { CreditCardType } from '../../../../src/services/RentPrep/types'

describe('src/transformers/landlord/BackgroundCheck:in', function () {
  it('should resolve', async function () {
    const payload = {
      applicationId: 'identifier',
      customer: {
        creditCard: {
          number: '4115900969145874',
          security: '123',
          type: 'visa' as CreditCardType,
          expiration: {
            month: 12,
            year: new Date().getFullYear()
          }
        },
        billingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '12345'
        },
        ipAddress: '127.0.0.1'
      }
    }

    const instance = new BackgroundCheck()
    const result = instance.in(payload)
    this.assert.deepEqual(result, {
      applicationId: 'identifier',
      customer: {
        creditCard: {
          number: '4115900969145874',
          security: '123',
          type: 'visa',
          expiration: {
            month: 12,
            year: new Date().getFullYear()
          }
        },
        billingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '12345'
        },
        ipAddress: '127.0.0.1'
      }
    })
  })

  it('should throw error if not a valid credit card number', async function () {
    const payload = {
      applicationId: 'identifier',
      customer: {
        creditCard: {
          number: 'invalid',
          security: '123',
          type: 'visa' as CreditCardType,
          expiration: {
            month: 12,
            year: new Date().getFullYear()
          }
        },
        billingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '12345'
        },
        ipAddress: '127.0.0.1'
      }
    }

    const instance = new BackgroundCheck()
    this.assert.throws(() => {
      instance.in(payload)
    }, '"customer.creditCard.number" must be a credit card')
  })

  it('should throw error if not a valid credit card security', async function () {
    const payload = {
      applicationId: 'identifier',
      customer: {
        creditCard: {
          number: '4115900969145874',
          security: 'invalid',
          type: 'visa' as CreditCardType,
          expiration: {
            month: 12,
            year: new Date().getFullYear()
          }
        },
        billingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '12345'
        },
        ipAddress: '127.0.0.1'
      }
    }

    const instance = new BackgroundCheck()
    this.assert.throws(() => {
      instance.in(payload)
    }, '"customer.creditCard.security" length must be less than or equal to 4 characters long')
  })

  it('should throw error if not a valid credit card type is not valid', async function () {
    const payload = {
      applicationId: 'identifier',
      customer: {
        creditCard: {
          number: '4115900969145874',
          security: '123',
          type: 'invalid' as CreditCardType,
          expiration: {
            month: 12,
            year: new Date().getFullYear()
          }
        },
        billingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '12345'
        },
        ipAddress: '127.0.0.1'
      }
    }

    const instance = new BackgroundCheck()
    this.assert.throws(() => {
      instance.in(payload)
    }, '"customer.creditCard.type" must be one of [visa, amex, mastercard, discover]')
  })

  it('should throw error if not a valid expiration month', async function () {
    const payload = {
      applicationId: 'identifier',
      customer: {
        creditCard: {
          number: '4115900969145874',
          security: '123',
          type: 'visa' as CreditCardType,
          expiration: {
            month: 0,
            year: new Date().getFullYear()
          }
        },
        billingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '12345'
        },
        ipAddress: '127.0.0.1'
      }
    }

    const instance = new BackgroundCheck()
    this.assert.throws(() => {
      instance.in(payload)
    }, '"customer.creditCard.expiration.month" must be a positive number')
  })

  it('should throw error if not a valid expiration year', async function () {
    const payload = {
      applicationId: 'identifier',
      customer: {
        creditCard: {
          number: '4115900969145874',
          security: '123',
          type: 'visa' as CreditCardType,
          expiration: {
            month: 12,
            year: new Date().getFullYear() - 1
          }
        },
        billingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '12345'
        },
        ipAddress: '127.0.0.1'
      }
    }

    const instance = new BackgroundCheck()
    this.assert.throws(() => {
      instance.in(payload)
    }, '"customer.creditCard.expiration.year" must be greater than or equal to 2021')
  })

  it('should throw error if not a valid zipcode', async function () {
    const payload = {
      applicationId: 'identifier',
      customer: {
        creditCard: {
          number: '4115900969145874',
          security: '123',
          type: 'visa' as CreditCardType,
          expiration: {
            month: 12,
            year: new Date().getFullYear()
          }
        },
        billingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '123456'
        },
        ipAddress: '127.0.0.1'
      }
    }

    const instance = new BackgroundCheck()
    this.assert.throws(() => {
      instance.in(payload)
    }, '"customer.billingAddress.zipcode" length must be 5 characters long')
  })

  it('should throw error if not a valid ipAddress', async function () {
    const payload = {
      applicationId: 'identifier',
      customer: {
        creditCard: {
          number: '4115900969145874',
          security: '123',
          type: 'visa' as CreditCardType,
          expiration: {
            month: 12,
            year: new Date().getFullYear()
          }
        },
        billingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '12345'
        },
        ipAddress: 'invalid'
      }
    }

    const instance = new BackgroundCheck()
    this.assert.throws(() => {
      instance.in(payload)
    }, '"customer.ipAddress" must be a valid ip address of one of the following versions [ipv4] with a optional CIDR')
  })
})
