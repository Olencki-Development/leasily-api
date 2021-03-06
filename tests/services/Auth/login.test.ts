import Auth from '../../../src/services/Auth'
import Verify from '../../../src/services/Verify'
import UnauthorizedError from '../../../src/errors/Unauthorized'

describe('src/services/Auth:login', function () {
  it('should throw error when user is not found', async function () {
    const userFindOne = this.sinon.stub().returns({
      exec: () => Promise.resolve(null)
    })
    this.container.fake('models', {
      User: {
        findOne: userFindOne
      }
    })

    const requestEmail = this.sinon.spy()
    this.container.fake(Verify, {
      requestEmail
    })

    const instance = new Auth({ secret: 'secret ' })
    try {
      await instance.login({
        email: 'test@email.com'
      })
      throw new Error('Unit test failed')
    } catch (e) {
      this.assert.instanceOf(e, UnauthorizedError)
    }
  })

  it('should resolve found user', async function () {
    const user: any = {
      id: 1
    }

    const userFindOne = this.sinon.stub().returns({
      exec: () => Promise.resolve(user)
    })
    this.container.fake('models', {
      User: {
        findOne: userFindOne
      }
    })

    const requestEmail = this.sinon.spy()
    this.container.fake(Verify, {
      requestEmail
    })

    const instance = new Auth({ secret: 'secret ' })
    const result = await instance.login({
      email: 'test@email.com'
    })
    this.assert.deepEqual(result, user)
  })
})
