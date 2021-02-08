import ApplicationRetrieve from '../../../../../src/services/renter/application/Retrieve'
import NotFoundError from '../../../../../src/errors/NotFoundError'

describe('src/services/renter/application/Retrieve:byId', function () {
  it('should throw error if applicant is not found', async function () {
    const Applicant = {
      findOne: this.sinon.stub().returns({
        populate: () => {
          return {
            populate: () => {
              return {
                exec: () => Promise.resolve(null)
              }
            }
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
      applicantId: '123'
    }

    const instance = new ApplicationRetrieve()
    try {
      await instance.byId(form)
      throw new Error('Unit test failed')
    } catch (e) {
      this.assert.instanceOf(e, NotFoundError)
    }
  })

  it('should resolve', async function () {
    const applicant = {
      application: {}
    }
    const Applicant = {
      findOne: this.sinon.stub().returns({
        populate: () => {
          return {
            populate: () => {
              return {
                exec: () => Promise.resolve(applicant)
              }
            }
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
      applicantId: '123'
    }

    const instance = new ApplicationRetrieve()
    const result = await instance.byId(form)
    this.assert.hasAllKeys(result, ['application', 'applicant'])
    this.assert.called(Applicant.findOne)
  })
})
