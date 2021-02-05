import Login from '../../../../src/transformers/auth/Login'

describe('src/transformers/auth/Login:in', function () {
  it('should resolve', async function () {
    const payload = {
      email: 'test@email.com'
    }

    const instance = new Login()
    const result = instance.in(payload)
    this.assert.deepEqual(result, {
      email: 'test@email.com'
    })
  })

  it('should throw error if not a valid email', function () {
    const payload = {
      email: 'invalid'
    }

    const instance = new Login()
    this.assert.throws(() => {
      instance.in(payload)
    }, '"email" must be a valid email')
  })
})
