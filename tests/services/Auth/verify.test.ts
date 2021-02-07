import Auth from '../../../src/services/Auth'
import Verify from '../../../src/services/Verify'
import UnauthorizedError from '../../../src/errors/Unauthorized'

describe('src/services/Auth:verify', function () {
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
      await instance.verify({
        email: 'test@email.com',
        code: '123456'
      })
      throw new Error('Unit test failed')
    } catch (e) {
      this.assert.instanceOf(e, UnauthorizedError)
    }
  })

  it('should resolve', async function () {
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

    const validateEmail = this.sinon.spy()
    this.container.fake(Verify, {
      validateEmail
    })

    const instance = new Auth({ secret: 'secret ' })
    const result = await instance.verify({
      email: 'test@email.com',
      code: '123456'
    })
    this.assert.hasAllKeys(result, ['user', 'token'])
    this.assert.isString(result.token)
    this.assert.deepEqual(result.user, user)
    this.assert.lengthOf(Object.keys(instance['_tokens']), 1)
  })
})
