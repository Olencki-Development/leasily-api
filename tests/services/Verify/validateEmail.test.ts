import Verify from '../../../src/services/Verify'
import Email from '../../../src/services/Email'
import UnauthorizedError from '../../../src/errors/Unauthorized'

describe('src/services/Verify:validateEmail', function () {
  it('should return true if successful', async function () {
    this.container.fake(Email, {})
    const user: any = {
      id: 'my-id',
      email: 'test@email.com'
    }
    const code = '123456'

    const instance = new Verify()
    instance['_codes'] = {
      'my-id': {
        dateTime: new Date(),
        code
      }
    }
    const result = instance.validateEmail({
      user,
      code
    })
    this.assert.isTrue(result)
    this.assert.deepEqual(instance['_codes'], {})
  })

  it('should throw error if code for user is not found', function () {
    this.container.fake(Email, {})
    const user: any = {
      id: 'my-id',
      email: 'test@email.com'
    }
    const code = '123456'

    const instance = new Verify()

    this.assert.throws(() => {
      instance.validateEmail({
        user,
        code
      })
    }, UnauthorizedError)
  })

  it('should throw error if code does not match', function () {
    this.container.fake(Email, {})
    const user: any = {
      id: 'my-id',
      email: 'test@email.com'
    }
    const code = '123456'

    const instance = new Verify()
    instance['_codes'] = {
      'my-id': {
        dateTime: new Date(),
        code: 'invalid'
      }
    }

    this.assert.throws(() => {
      instance.validateEmail({
        user,
        code
      })
    }, UnauthorizedError)
  })

  it('should throw error if code has expired', function () {
    this.container.fake(Email, {})
    const user: any = {
      id: 'my-id',
      email: 'test@email.com'
    }
    const code = '123456'

    const oldDate = new Date(
      new Date().getTime() - Verify['TEN_MINUTES_IN_MS'] - 1
    )

    const instance = new Verify()
    instance['_codes'] = {
      'my-id': {
        dateTime: oldDate,
        code
      }
    }

    this.assert.throws(() => {
      instance.validateEmail({
        user,
        code
      })
    }, UnauthorizedError)
  })
})
