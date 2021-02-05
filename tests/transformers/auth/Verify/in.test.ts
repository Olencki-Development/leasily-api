import Verify from '../../../../src/transformers/auth/Verify'

describe('src/transformers/auth/Verify:in', function () {
  it('should resolve', async function () {
    const payload = {
      email: 'test@email.com',
      code: '123456'
    }

    const instance = new Verify()
    const result = instance.in(payload)
    this.assert.deepEqual(result, {
      email: 'test@email.com',
      code: '123456'
    })
  })

  it('should throw error if not a valid email', function () {
    const payload = {
      email: 'invalid',
      code: '123456'
    }

    const instance = new Verify()
    this.assert.throws(() => {
      instance.in(payload)
    }, '"email" must be a valid email')
  })

  it('should throw error if code is not length 6', function () {
    const payload = {
      email: 'test@email.com',
      code: 'invalid'
    }

    const instance = new Verify()
    this.assert.throws(() => {
      instance.in(payload)
    }, '"code" length must be 6 characters long')
  })
})
