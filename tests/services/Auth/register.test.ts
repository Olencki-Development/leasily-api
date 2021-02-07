import Auth from '../../../src/services/Auth'
import Verify from '../../../src/services/Verify'

describe('src/services/Auth:register', function () {
  it('should return new user', async function () {
    const user: any = {
      id: 1
    }

    const userCreate = this.sinon.stub().returns(Promise.resolve(user))
    this.container.fake('models', {
      User: {
        create: userCreate
      }
    })

    const requestEmail = this.sinon.spy()
    this.container.fake(Verify, {
      requestEmail
    })

    const instance = new Auth({ secret: 'secret ' })
    const result = await instance.register({
      fullName: 'Test User',
      phone: '1234567890',
      email: 'test@email.com'
    })

    this.assert.deepEqual(result, user)
    this.assert.called(userCreate)
    this.assert.called(requestEmail)
  })
})
