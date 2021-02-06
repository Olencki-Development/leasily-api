import { login } from '../../../../src/services/Auth/validate'

describe('src/services/Auth/validate:login', function () {
  it('should resolve', async function () {
    const payload = {
      email: 'test@email.com'
    }

    const result = login(payload)
    this.assert.deepEqual(result, {
      email: 'test@email.com'
    })
  })

  it('should throw error if not a valid email', function () {
    const payload = {
      email: 'invalid'
    }

    this.assert.throws(() => {
      login(payload)
    }, '"email" must be a valid email')
  })
})
