import ApplicationCreate from '../../../../../src/transformers/landlord/application/Create'

describe('src/transformers/landlord/application/Create:in', function () {
  it('should resolve', async function () {
    const startDate = new Date(
      new Date().getFullYear() + 1,
      new Date().getMonth(),
      new Date().getDate()
    )
    const payload = {
      property: {
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '12345'
        },
        unit: null
      },
      lease: {
        securityDeposit: {
          amount: 1400
        },
        rent: {
          amount: 1400
        },
        lengthInMonths: 12,
        startDate: startDate.toISOString()
      },
      applicants: [
        {
          fullName: 'Applicant #1',
          email: 'test@email.com',
          phone: '1234567890'
        }
      ],
      waitPeriodInDays: 5,
      fee: 50
    }

    const instance = new ApplicationCreate()
    const result = instance.in(payload)
    this.assert.deepEqual(result, {
      property: {
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '12345'
        },
        unit: null
      },
      lease: {
        securityDeposit: {
          amount: 1400
        },
        rent: {
          amount: 1400
        },
        lengthInMonths: 12,
        startDate: startDate as any
      },
      applicants: [
        {
          fullName: 'Applicant #1',
          email: 'test@email.com',
          phone: '1234567890'
        }
      ],
      waitPeriodInDays: 5,
      fee: 50
    })
  })

  it('should resolve with optional values', async function () {
    const startDate = new Date(
      new Date().getFullYear() + 1,
      new Date().getMonth(),
      new Date().getDate()
    )
    const payload = {
      property: {
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '12345'
        },
        unit: 'Unit 1'
      },
      lease: {
        securityDeposit: {
          amount: 1400
        },
        rent: {
          amount: 1400
        },
        lengthInMonths: 12,
        startDate: startDate.toISOString()
      },
      applicants: [
        {
          fullName: 'Applicant #1',
          email: 'test@email.com',
          phone: '1234567890'
        }
      ],
      waitPeriodInDays: 5,
      fee: 50
    }

    const instance = new ApplicationCreate()
    const result = instance.in(payload)
    this.assert.deepEqual(result, {
      property: {
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '12345'
        },
        unit: 'Unit 1'
      },
      lease: {
        securityDeposit: {
          amount: 1400
        },
        rent: {
          amount: 1400
        },
        lengthInMonths: 12,
        startDate: startDate as any
      },
      applicants: [
        {
          fullName: 'Applicant #1',
          email: 'test@email.com',
          phone: '1234567890'
        }
      ],
      waitPeriodInDays: 5,
      fee: 50
    })
  })

  it('should throw error when securityDeposit amount < 1', async function () {
    const startDate = new Date(
      new Date().getFullYear() + 1,
      new Date().getMonth(),
      new Date().getDate()
    )
    const payload = {
      property: {
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '12345'
        },
        unit: 'Unit 1'
      },
      lease: {
        securityDeposit: {
          amount: 0
        },
        rent: {
          amount: 1400
        },
        lengthInMonths: 12,
        startDate: startDate.toISOString()
      },
      applicants: [
        {
          fullName: 'Applicant #1',
          email: 'test@email.com',
          phone: '1234567890'
        }
      ],
      waitPeriodInDays: 5,
      fee: 50
    }

    const instance = new ApplicationCreate()
    this.assert.throws(() => {
      instance.in(payload)
    }, '"lease.securityDeposit.amount" must be greater than or equal to 1')
  })

  it('should throw error when rent amount < 1', async function () {
    const startDate = new Date(
      new Date().getFullYear() + 1,
      new Date().getMonth(),
      new Date().getDate()
    )
    const payload = {
      property: {
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '12345'
        },
        unit: 'Unit 1'
      },
      lease: {
        securityDeposit: {
          amount: 1400
        },
        rent: {
          amount: 0
        },
        lengthInMonths: 12,
        startDate: startDate.toISOString()
      },
      applicants: [
        {
          fullName: 'Applicant #1',
          email: 'test@email.com',
          phone: '1234567890'
        }
      ],
      waitPeriodInDays: 5,
      fee: 50
    }

    const instance = new ApplicationCreate()
    this.assert.throws(() => {
      instance.in(payload)
    }, '"lease.rent.amount" must be greater than or equal to 1')
  })

  it('should throw error when lengthInMonths < 1', async function () {
    const startDate = new Date(
      new Date().getFullYear() + 1,
      new Date().getMonth(),
      new Date().getDate()
    )
    const payload = {
      property: {
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '12345'
        },
        unit: 'Unit 1'
      },
      lease: {
        securityDeposit: {
          amount: 1400
        },
        rent: {
          amount: 1400
        },
        lengthInMonths: 0,
        startDate: startDate.toISOString()
      },
      applicants: [
        {
          fullName: 'Applicant #1',
          email: 'test@email.com',
          phone: '1234567890'
        }
      ],
      waitPeriodInDays: 5,
      fee: 50
    }

    const instance = new ApplicationCreate()
    this.assert.throws(() => {
      instance.in(payload)
    }, '"lease.lengthInMonths" must be greater than or equal to 1')
  })

  it('should throw error when startDate is older than now', async function () {
    const payload = {
      property: {
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '12345'
        },
        unit: 'Unit 1'
      },
      lease: {
        securityDeposit: {
          amount: 1400
        },
        rent: {
          amount: 1400
        },
        lengthInMonths: 12,
        startDate: new Date().toISOString()
      },
      applicants: [
        {
          fullName: 'Applicant #1',
          email: 'test@email.com',
          phone: '1234567890'
        }
      ],
      waitPeriodInDays: 5,
      fee: 50
    }

    const instance = new ApplicationCreate()
    this.assert.throws(() => {
      instance.in(payload)
    }, '"lease.startDate" must be greater than or equal to "now"')
  })

  it('should throw error when applicants is empty', async function () {
    const startDate = new Date(
      new Date().getFullYear() + 1,
      new Date().getMonth(),
      new Date().getDate()
    )
    const payload = {
      property: {
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '12345'
        },
        unit: 'Unit 1'
      },
      lease: {
        securityDeposit: {
          amount: 1400
        },
        rent: {
          amount: 1400
        },
        lengthInMonths: 12,
        startDate: startDate.toISOString()
      },
      applicants: [],
      waitPeriodInDays: 5,
      fee: 50
    }

    const instance = new ApplicationCreate()
    this.assert.throws(() => {
      instance.in(payload)
    }, '"applicants" does not contain 1 required value(s)')
  })

  it('should throw error when waitPeriodInDays is < 1', async function () {
    const startDate = new Date(
      new Date().getFullYear() + 1,
      new Date().getMonth(),
      new Date().getDate()
    )
    const payload = {
      property: {
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '12345'
        },
        unit: 'Unit 1'
      },
      lease: {
        securityDeposit: {
          amount: 1400
        },
        rent: {
          amount: 1400
        },
        lengthInMonths: 12,
        startDate: startDate.toISOString()
      },
      applicants: [
        {
          fullName: 'Applicant #1',
          email: 'test@email.com',
          phone: '1234567890'
        }
      ],
      waitPeriodInDays: 0,
      fee: 50
    }

    const instance = new ApplicationCreate()
    this.assert.throws(() => {
      instance.in(payload)
    }, '"waitPeriodInDays" must be greater than or equal to 1')
  })

  it('should throw error when fee is < 0', async function () {
    const startDate = new Date(
      new Date().getFullYear() + 1,
      new Date().getMonth(),
      new Date().getDate()
    )
    const payload = {
      property: {
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '12345'
        },
        unit: 'Unit 1'
      },
      lease: {
        securityDeposit: {
          amount: 1400
        },
        rent: {
          amount: 1400
        },
        lengthInMonths: 12,
        startDate: startDate.toISOString()
      },
      applicants: [
        {
          fullName: 'Applicant #1',
          email: 'test@email.com',
          phone: '1234567890'
        }
      ],
      waitPeriodInDays: 50,
      fee: -1
    }

    const instance = new ApplicationCreate()
    this.assert.throws(() => {
      instance.in(payload)
    }, '"fee" must be greater than or equal to 0')
  })
})
