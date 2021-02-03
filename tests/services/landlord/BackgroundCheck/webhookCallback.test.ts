import BackgroundCheck from '../../../../src/services/landlord/BackgroundCheck'
import NotFoundError from '../../../../src/errors/NotFoundError'
import Email from '../../../../src/services/Email'

describe('src/services/landlord/BackgroundCheck:webhookCallback', function () {
  it('should throw error if landlord is not found', async function () {
    const mockEmail = {
      send: this.sinon.spy()
    }
    this.container.fake(Email, mockEmail)

    const Landlord = {
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
      Landlord
    })

    const form: any = {
      customerReferenceId: 'my-landlord',
      file: true
    }

    const instance = new BackgroundCheck()
    try {
      await instance.webhookCallback(form)
      throw new Error('Unit test failed')
    } catch (e) {
      this.assert.instanceOf(e, NotFoundError)
      this.assert.called(Landlord.findOne)
    }
  })

  it('should resolve with file', async function () {
    const mockEmail = {
      send: this.sinon.spy()
    }
    this.container.fake(Email, mockEmail)

    const landlord = {
      id: 'my-landlord',
      application: {
        property: {
          address: {
            street: '123 Main St'
          }
        }
      }
    }
    const Landlord = {
      findOne: this.sinon.stub().returns({
        populate: () => {
          return {
            populate: () => {
              return {
                exec: () => Promise.resolve(landlord)
              }
            }
          }
        }
      })
    }
    this.container.fake('models', {
      Landlord
    })

    const form: any = {
      customerReferenceId: 'my-landlord',
      file: true
    }

    const instance = new BackgroundCheck()
    await instance.webhookCallback(form)
    this.assert.called(Landlord.findOne)
    this.assert.called(mockEmail.send)
  })

  it('should resolve without file', async function () {
    const mockEmail = {
      send: this.sinon.spy()
    }
    this.container.fake(Email, mockEmail)

    const landlord = {
      id: 'my-landlord',
      application: {
        property: {
          address: {
            street: '123 Main St'
          }
        }
      },
      user: {
        email: 'test@email.com'
      }
    }
    const Landlord = {
      findOne: this.sinon.stub().returns({
        populate: () => {
          return {
            populate: () => {
              return {
                exec: () => Promise.resolve(landlord)
              }
            }
          }
        }
      })
    }
    this.container.fake('models', {
      Landlord
    })

    const form: any = {
      customerReferenceId: 'my-landlord',
      file: false
    }

    const instance = new BackgroundCheck()
    await instance.webhookCallback(form)
    this.assert.called(Landlord.findOne)
    this.assert.notCalled(mockEmail.send)
  })
})
