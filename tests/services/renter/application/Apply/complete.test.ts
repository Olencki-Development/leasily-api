import ApplicationApply from '../../../../../src/services/renter/application/Apply'
import Email from '../../../../../src/services/Email'
import NotFoundError from '../../../../../src/errors/NotFoundError'

describe('src/services/renter/application/Apply:complete', function () {
  it('should throw error if applicant is not found', async function () {
    const mockEmail = {
      send: this.sinon.spy()
    }
    this.container.fake(Email, mockEmail)

    const Applicant = {
      findOne: this.sinon.stub().returns({
        populate: () => {
          return {
            exec: () => Promise.resolve(null)
          }
        }
      })
    }
    this.container.fake('models', {
      Applicant
    })

    const form: any = {
      user: {
        id: 'my-user'
      },
      applicantId: 'my-applicant'
    }

    const baseUrl = 'http://localhost:8000'
    const apply = new ApplicationApply(baseUrl)
    try {
      await apply.complete(form)
      throw new Error('Unit test failed')
    } catch (e) {
      this.assert.instanceOf(e, NotFoundError)
      this.assert.called(Applicant.findOne)
    }
  })

  it('should resolve when not all applicants have completed their history', async function () {
    const mockEmail = {
      send: this.sinon.spy()
    }
    this.container.fake(Email, mockEmail)

    const applicant = {
      id: 'my-applicant',
      save: this.sinon.spy(),
      application: {
        id: 'my-application'
      }
    }
    const Applicant = {
      findOne: this.sinon.stub().returns({
        populate: () => {
          return {
            exec: () => Promise.resolve(applicant)
          }
        }
      }),
      find: this.sinon.stub().returns({
        exec: () => Promise.resolve([applicant])
      })
    }
    this.container.fake('models', {
      Applicant
    })

    const form: any = {
      user: {
        id: 'my-user'
      },
      applicantId: 'my-applicant'
    }

    const baseUrl = 'http://localhost:8000'
    const apply = new ApplicationApply(baseUrl)
    await apply.complete(form)
    this.assert.called(Applicant.findOne)
    this.assert.called(applicant.save)
    this.assert.called(Applicant.find)
  })

  it('should resolve when all applicants have completed their history', async function () {
    const mockEmail = {
      send: this.sinon.spy()
    }
    this.container.fake(Email, mockEmail)

    const applicant = {
      id: 'my-applicant',
      save: this.sinon.spy(),
      application: {
        id: 'my-application',
        save: this.sinon.spy(),
        property: {
          address: {
            street: '123 Main St'
          }
        }
      }
    }
    const Applicant = {
      findOne: this.sinon.stub().returns({
        populate: () => {
          return {
            exec: () => Promise.resolve(applicant)
          }
        }
      }),
      find: this.sinon.stub().returns({
        exec: () => Promise.resolve([applicant])
      })
    }
    const landlord = {
      id: 'my-landlord',
      user: {
        email: 'test@email.com'
      }
    }
    const Landlord = {
      findOne: this.sinon.stub().returns({
        exec: () => Promise.resolve(landlord)
      })
    }
    this.container.fake('models', {
      Applicant,
      Landlord
    })

    const form: any = {
      user: {
        id: 'my-user'
      },
      applicantId: 'my-applicant',
      history: {}
    }

    const baseUrl = 'http://localhost:8000'
    const apply = new ApplicationApply(baseUrl)
    await apply.complete(form)
    this.assert.called(Applicant.findOne)
    this.assert.called(applicant.save)
    this.assert.called(Applicant.find)
    this.assert.called(applicant.application.save)
    this.assert.called(mockEmail.send)
  })

  it('should resolve when all applicants have completed their history and landlord is not found', async function () {
    const mockEmail = {
      send: this.sinon.spy()
    }
    this.container.fake(Email, mockEmail)

    const applicant = {
      id: 'my-applicant',
      save: this.sinon.spy(),
      application: {
        id: 'my-application',
        save: this.sinon.spy(),
        property: {
          address: {
            street: '123 Main St'
          }
        }
      }
    }
    const Applicant = {
      findOne: this.sinon.stub().returns({
        populate: () => {
          return {
            exec: () => Promise.resolve(applicant)
          }
        }
      }),
      find: this.sinon.stub().returns({
        exec: () => Promise.resolve([applicant])
      })
    }

    const Landlord = {
      findOne: this.sinon.stub().returns({
        exec: () => Promise.resolve(null)
      })
    }
    this.container.fake('models', {
      Applicant,
      Landlord
    })

    const form: any = {
      user: {
        id: 'my-user'
      },
      applicantId: 'my-applicant',
      history: {}
    }

    const baseUrl = 'http://localhost:8000'
    const apply = new ApplicationApply(baseUrl)
    await apply.complete(form)
    this.assert.called(Applicant.findOne)
    this.assert.called(applicant.save)
    this.assert.called(Applicant.find)
    this.assert.called(applicant.application.save)
    this.assert.notCalled(mockEmail.send)
  })
})
