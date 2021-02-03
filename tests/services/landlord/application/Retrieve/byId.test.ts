import ApplicationRetrieve from '../../../../../src/services/landlord/application/Retrieve'
import NotFoundError from '../../../../../src/errors/NotFoundError'

describe('src/services/landlord/application/Retrieve:all', function () {
  it('should throw error if landlord is not found', async function () {
    const Landlord = {
      findOne: this.sinon.stub().returns({
        populate: () => {
          return {
            exec: () => Promise.resolve(null)
          }
        }
      })
    }

    const applicant = {}
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

    const form: any = {}

    const instance = new ApplicationRetrieve()
    try {
      await instance.byId(form)
      throw new Error('Unit test failed')
    } catch (e) {
      this.assert.instanceOf(e, NotFoundError)
    }
  })

  it('should resolve', async function () {
    const landlord = {
      application: {}
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

    const applicant = {}
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

    const form: any = {}

    const instance = new ApplicationRetrieve()
    const result = await instance.byId(form)
    this.assert.hasAllKeys(result, ['application', 'applicants', 'landlord'])
    this.assert.called(Landlord.findOne)
    this.assert.called(Applicant.find)
  })
})
