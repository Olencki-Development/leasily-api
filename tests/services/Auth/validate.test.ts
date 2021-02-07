import Auth from '../../../src/services/Auth'
import ForbiddenError from '../../../src/errors/ForbiddenError'

describe('src/services/Auth:validate', function () {
  it('should throw error when token is not found', async function () {
    const instance = new Auth({
      secret: 'secret'
    })

    try {
      await instance.validate({
        token: 'invalid'
      })
      throw new Error('Unit test failed')
    } catch (e) {
      this.assert.instanceOf(e, ForbiddenError)
    }
  })

  it('should throw error when user is not found', async function () {
    const User = {
      findOne: this.sinon.stub().returns({
        exec: () => Promise.resolve(null)
      })
    }
    this.container.fake('models', {
      User
    })

    const instance = new Auth({
      secret: 'secret'
    })
    instance['_tokens']['token'] = 'my_id'
    try {
      await instance.validate({
        token: 'token'
      })
      throw new Error('Unit test failed')
    } catch (e) {
      this.assert.instanceOf(e, ForbiddenError)
    }
  })

  it('should resolve', async function () {
    const user: any = {
      id: 'my_id'
    }
    const User = {
      findOne: this.sinon.stub().returns({
        exec: () => Promise.resolve(user)
      })
    }
    this.container.fake('models', {
      User
    })

    const instance = new Auth({
      secret: 'secret'
    })
    instance['_tokens']['token'] = 'my_id'
    const result = await instance.validate({
      token: 'token'
    })
    this.assert.deepEqual(result, user)
  })
})
