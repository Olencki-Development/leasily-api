import BackgroundCheck from '../../../../src/services/landlord/BackgroundCheck'
import Email from '../../../../src/services/Email'
import NotFoundError from '../../../../src/errors/NotFoundError'
import ApplicationPendingError from '../../../../src/errors/ApplicationPendingError'
import { APPLICATION_STAGES } from '../../../../src/models/Application'
import RentPrep from '../../../../src/services/RentPrep'

describe('src/services/landlord/BackgroundCheck:request', function () {
  it('should throw error if landlord is not found', async function () {
    const mockEmail = {
      send: this.sinon.spy()
    }
    this.container.fake(Email, mockEmail)

    const Landlord = {
      findOne: this.sinon.stub().returns({
        populate: () => {
          return {
            exec: () => Promise.resolve(null)
          }
        }
      })
    }
    this.container.fake('models', {
      Landlord
    })

    const form: any = {
      user: {
        id: 'my-user'
      },
      applicationId: 'my-application'
    }

    const instance = new BackgroundCheck()
    try {
      await instance.request(form)
      throw new Error('Unit test failed')
    } catch (e) {
      this.assert.instanceOf(e, NotFoundError)
      this.assert.called(Landlord.findOne)
    }
  })

  it('should throw error if application stage is not APPLICATION_STAGES.AWAITING_APPLICATION_REVIEW', async function () {
    const mockEmail = {
      send: this.sinon.spy()
    }
    this.container.fake(Email, mockEmail)

    const landlord = {
      id: 'my-landlord',
      application: {
        id: 'my-application',
        stage: APPLICATION_STAGES.AWAITING_COMPLETION
      }
    }
    const Landlord = {
      findOne: this.sinon.stub().returns({
        populate: () => {
          return {
            exec: () => Promise.resolve(landlord)
          }
        }
      })
    }
    this.container.fake('models', {
      Landlord
    })

    const form: any = {
      user: {
        id: 'my-user'
      },
      applicationId: 'my-application'
    }

    const instance = new BackgroundCheck()
    try {
      await instance.request(form)
      throw new Error('Unit test failed')
    } catch (e) {
      this.assert.instanceOf(e, ApplicationPendingError)
      this.assert.called(Landlord.findOne)
    }
  })

  it('should resolve', async function () {
    const mockEmail = {
      send: this.sinon.spy()
    }
    this.container.fake(Email, mockEmail)

    const mockRentPrep = {
      fetchBackgroundcheck: this.sinon.spy()
    }
    this.container.fake(RentPrep, mockRentPrep)

    const landlord = {
      id: 'my-landlord',
      application: {
        id: 'my-application',
        stage: APPLICATION_STAGES.AWAITING_APPLICATION_REVIEW,
        save: this.sinon.spy()
      }
    }
    const Landlord = {
      findOne: this.sinon.stub().returns({
        populate: () => {
          return {
            exec: () => Promise.resolve(landlord)
          }
        }
      })
    }
    const applicant = {
      id: 'my-applicant',
      history: {
        dob: new Date(),
        residences: {
          current: {
            address: {},
            reference: {
              name: 'Test Name'
            }
          },
          previous: {
            address: {},
            reference: {
              name: 'Test Name'
            }
          }
        },
        employment: {
          supervisor: {}
        }
      },
      user: {
        fullName: 'Test User'
      }
    }
    const Applicant = {
      find: this.sinon.stub().returns({
        populate: () => {
          return {
            exec: () => Promise.resolve([applicant])
          }
        }
      })
    }
    this.container.fake('models', {
      Landlord,
      Applicant
    })

    const form: any = {
      user: {
        id: 'my-user',
        fullName: 'Test User'
      },
      applicationId: 'my-application',
      customer: {
        creditCard: {
          number: 'xx',
          security: 'xxx',
          type: 'visa',
          expiration: {
            month: '09',
            year: '2020'
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
    await instance.request(form)
    this.assert.called(Landlord.findOne)
    this.assert.called(Applicant.find)
    this.assert.called(mockRentPrep.fetchBackgroundcheck)
    this.assert.called(landlord.application.save)
  })
})
