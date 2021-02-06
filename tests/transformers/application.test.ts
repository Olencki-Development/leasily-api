import toJson from '../../src/transformers/application'
import { APPLICATION_STAGES } from '../../src/models/Application'

describe('src/transformers/application', function () {
  it('should resolve', function () {
    const payload: any = {
      application: {
        id: 'my_id',
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
            amount: 1400,
            hasBeenCollected: false
          },
          rent: {
            amount: 1400
          },
          lengthInMonths: 12,
          startDate: new Date(),
          isMonthToMonth: () => {
            return false
          }
        },
        stage: APPLICATION_STAGES.AWAITING_APPLICATION_REVIEW,
        isClosed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      applicants: [
        {
          history: {
            ssn: '123456789',
            dob: new Date(),
            pets: [
              {
                type: 'dog',
                breed: 'lab',
                name: 'buddy'
              }
            ],
            emergencyContacts: ['1234567890'],
            isSmoker: false,
            residences: {
              current: {
                address: {
                  street: '123 Main St',
                  city: 'New York',
                  state: 'NY',
                  zipcode: '12345'
                },
                start: new Date(),
                reasonForLeaving: 'Something',
                amount: 1000,
                reference: {
                  name: 'reference #1',
                  phone: '1234567890'
                }
              },
              previous: {
                address: {
                  street: '123 Main St',
                  city: 'New York',
                  state: 'NY',
                  zipcode: '12345'
                },
                start: new Date(),
                end: new Date(),
                reasonForLeaving: 'Something',
                amount: 1000,
                reference: {
                  name: 'reference #1',
                  phone: '1234567890'
                }
              }
            },
            credit: {
              hasDeclaredBankruptcy: false,
              hasPreviousEviction: false,
              hasLatePayments: false,
              hasRefusedToPayRent: false,
              reasonForRefusalOfRent: null
            },
            employment: {
              status: 'Full Time',
              employer: 'Leasily',
              start: new Date(),
              position: 'Developer',
              supervisor: {
                name: 'supervisor #1',
                phone: '1234567890'
              },
              salary: {
                amount: 100,
                interval: 'weekly'
              },
              additionalIncome: {
                amount: null,
                interval: null
              }
            }
          },
          user: {
            id: 'user-1',
            fullName: 'User #1',
            email: 'test@email.com',
            phone: '1234567890',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        }
      ]
    }

    const result = toJson(payload)
    this.assert.deepEqual(result, {
      id: 'my_id',
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
          amount: 1400,
          hasBeenCollected: false
        },
        rent: {
          amount: 1400
        },
        isMonthToMonth: false,
        lengthInMonths: 12,
        startDate: payload.application.lease.startDate.toISOString()
      },
      applicants: [
        {
          user: {
            id: 'user-1',
            fullName: 'User #1',
            email: 'test@email.com',
            phone: '1234567890',
            createdAt: payload.applicants[0].user.createdAt.toISOString(),
            updatedAt: payload.applicants[0].user.updatedAt.toISOString()
          },
          history: {
            ssn: '123456789',
            dob: payload.applicants[0].history.dob.toISOString(),
            pets: [
              {
                type: 'dog',
                breed: 'lab',
                name: 'buddy'
              }
            ],
            emergencyContacts: ['1234567890'],
            isSmoker: false,
            residences: {
              current: {
                address: {
                  street: '123 Main St',
                  city: 'New York',
                  state: 'NY',
                  zipcode: '12345'
                },
                start: payload.applicants[0].history.residences.current.start.toISOString(),
                reasonForLeaving: 'Something',
                amount: 1000,
                reference: {
                  name: 'reference #1',
                  phone: '1234567890'
                }
              },
              previous: {
                address: {
                  street: '123 Main St',
                  city: 'New York',
                  state: 'NY',
                  zipcode: '12345'
                },
                start: payload.applicants[0].history.residences.previous.start.toISOString(),
                end: payload.applicants[0].history.residences.previous.end.toISOString(),
                reasonForLeaving: 'Something',
                amount: 1000,
                reference: {
                  name: 'reference #1',
                  phone: '1234567890'
                }
              }
            },
            credit: {
              hasDeclaredBankruptcy: false,
              hasPreviousEviction: false,
              hasLatePayments: false,
              hasRefusedToPayRent: false,
              reasonForRefusalOfRent: null
            },
            employment: {
              status: 'Full Time',
              employer: 'Leasily',
              start: payload.applicants[0].history.employment.start.toISOString(),
              position: 'Developer',
              supervisor: {
                name: 'supervisor #1',
                phone: '1234567890'
              },
              salary: {
                amount: 100,
                interval: 'weekly'
              },
              additionalIncome: {
                amount: null,
                interval: null
              }
            }
          }
        }
      ],
      stage: 2,
      isClosed: false,
      createdAt: payload.application.createdAt.toISOString(),
      updatedAt: payload.application.updatedAt.toISOString()
    })
  })

  it('should resolve without history', function () {
    const payload: any = {
      application: {
        id: 'my_id',
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
            amount: 1400,
            hasBeenCollected: false
          },
          rent: {
            amount: 1400
          },
          lengthInMonths: 12,
          startDate: new Date(),
          isMonthToMonth: () => {
            return false
          }
        },
        stage: APPLICATION_STAGES.AWAITING_APPLICATION_REVIEW,
        isClosed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      applicants: [
        {
          history: null,
          user: {
            id: 'user-1',
            fullName: 'User #1',
            email: 'test@email.com',
            phone: '1234567890',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        }
      ]
    }

    const result = toJson(payload)
    this.assert.deepEqual(result, {
      id: 'my_id',
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
          amount: 1400,
          hasBeenCollected: false
        },
        rent: {
          amount: 1400
        },
        isMonthToMonth: false,
        lengthInMonths: 12,
        startDate: payload.application.lease.startDate.toISOString()
      },
      applicants: [
        {
          user: {
            id: 'user-1',
            fullName: 'User #1',
            email: 'test@email.com',
            phone: '1234567890',
            createdAt: payload.applicants[0].user.createdAt.toISOString(),
            updatedAt: payload.applicants[0].user.updatedAt.toISOString()
          },
          history: null
        }
      ],
      stage: 2,
      isClosed: false,
      createdAt: payload.application.createdAt.toISOString(),
      updatedAt: payload.application.updatedAt.toISOString()
    })
  })
})
