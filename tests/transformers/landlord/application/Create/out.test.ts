import ApplicationCreate from '../../../../../src/transformers/landlord/application/Create'
import { APPLICATION_STAGES } from '../../../../../src/models/Application'

describe('src/transformers/landlord/application/Create:out', function () {
  it('should resolve', function () {
    const payload: any = [
      {
        application: {
          id: 'my-id',
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
    ]

    const instance = new ApplicationCreate()
    const result = instance.out(payload)
    this.assert.deepEqual(result, {
      applications: [
        {
          id: 'my-id',
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
            startDate: payload[0].application.lease.startDate.toISOString()
          },
          applicants: [
            {
              user: {
                id: 'user-1',
                fullName: 'User #1',
                email: 'test@email.com',
                phone: '1234567890',
                createdAt: payload[0].applicants[0].user.createdAt.toISOString(),
                updatedAt: payload[0].applicants[0].user.updatedAt.toISOString()
              },
              history: {
                ssn: '123456789',
                dob: payload[0].applicants[0].history.dob.toISOString(),
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
                    start: payload[0].applicants[0].history.residences.current.start.toISOString(),
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
                    start: payload[0].applicants[0].history.residences.previous.start.toISOString(),
                    end: payload[0].applicants[0].history.residences.previous.end.toISOString(),
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
                  start: payload[0].applicants[0].history.employment.start.toISOString(),
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
          createdAt: payload[0].application.createdAt.toISOString(),
          updatedAt: payload[0].application.updatedAt.toISOString()
        }
      ]
    })
  })

  it('should resolve without history', function () {
    const payload: any = [
      {
        application: {
          id: 'my-id',
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
    ]

    const instance = new ApplicationCreate()
    const result = instance.out(payload)
    this.assert.deepEqual(result, {
      applications: [
        {
          id: 'my-id',
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
            startDate: payload[0].application.lease.startDate.toISOString()
          },
          applicants: [
            {
              user: {
                id: 'user-1',
                fullName: 'User #1',
                email: 'test@email.com',
                phone: '1234567890',
                createdAt: payload[0].applicants[0].user.createdAt.toISOString(),
                updatedAt: payload[0].applicants[0].user.updatedAt.toISOString()
              },
              history: null
            }
          ],
          stage: 2,
          isClosed: false,
          createdAt: payload[0].application.createdAt.toISOString(),
          updatedAt: payload[0].application.updatedAt.toISOString()
        }
      ]
    })
  })
})
