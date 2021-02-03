import ApplicationRetrieve from '../../../../../src/services/landlord/application/Retrieve'

describe('src/services/landlord/application/Retrieve:all', function () {
  it('should resolve', async function () {
    const landlord = {
      application: {}
    }
    const Landlord = {
      find: this.sinon.stub().returns({
        populate: () => {
          return {
            exec: () => Promise.resolve([landlord])
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
    const result = await instance.all(form)
    this.assert.isArray(result)
    this.assert.hasAllKeys(result[0], ['application', 'applicants', 'landlord'])
    this.assert.called(Landlord.find)
    this.assert.called(Applicant.find)
  })
})
