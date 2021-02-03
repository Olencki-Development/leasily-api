import ApplicationDecision from '../../../../../src/services/landlord/application/Decision'
import Email from '../../../../../src/services/Email'
import NotFoundError from '../../../../../src/errors/NotFoundError'
import ApplicationResolvedError from '../../../../../src/errors/ApplicationResolvedError'
import { APPLICATION_STAGES } from '../../../../../src/models/Application'

describe('src/services/landlord/application/Decision:decline', function () {
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

    const instance = new ApplicationDecision()

    const form: any = {}
    try {
      await instance.decline(form)
      throw new Error('Unit test failed')
    } catch (e) {
      this.assert.instanceOf(e, NotFoundError)
    }
  })

  it('should throw error if a decision has already been made and application is closed', async function () {
    const mockEmail = {
      send: this.sinon.spy()
    }
    this.container.fake(Email, mockEmail)

    const landlord = {
      application: {
        isClosed: true
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

    const instance = new ApplicationDecision()

    const form: any = {}
    try {
      await instance.decline(form)
      throw new Error('Unit test failed')
    } catch (e) {
      this.assert.instanceOf(e, ApplicationResolvedError)
      this.assert.called(Landlord.findOne)
    }
  })

  it('should throw error if a decision has already been made and application is approved', async function () {
    const mockEmail = {
      send: this.sinon.spy()
    }
    this.container.fake(Email, mockEmail)

    const landlord = {
      application: {
        stage: APPLICATION_STAGES.RENTED
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

    const instance = new ApplicationDecision()

    const form: any = {}
    try {
      await instance.decline(form)
      throw new Error('Unit test failed')
    } catch (e) {
      this.assert.instanceOf(e, ApplicationResolvedError)
      this.assert.called(Landlord.findOne)
    }
  })

  it('should resolve', async function () {
    const mockEmail = {
      send: this.sinon.spy()
    }
    this.container.fake(Email, mockEmail)

    const landlord = {
      application: {
        property: {
          address: {
            street: '123 Main St'
          }
        },
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
      user: {
        email: 'test@email.com'
      }
    }
    const Applicant = {
      find: this.sinon.stub().returns({
        exec: () => Promise.resolve([applicant])
      })
    }
    this.container.fake('models', {
      Landlord,
      Applicant
    })

    const instance = new ApplicationDecision()

    const form: any = {}
    await instance.decline(form)
    this.assert.called(Landlord.findOne)
    this.assert.called(landlord.application.save)
    this.assert.called(mockEmail.send)
  })
})
