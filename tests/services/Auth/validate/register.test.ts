import { register } from '../../../../src/services/Auth/validate'

describe('src/services/Auth/validate:register', function () {
  it('should resolve', async function () {
    const payload = {
      fullName: 'User Test',
      email: 'test@email.com',
      phone: '2038853291'
    }

    const result = register(payload)
    this.assert.deepEqual(result, {
      fullName: 'User Test',
      email: 'test@email.com',
      phone: '(203) 885-3291'
    })
  })

  it('should throw error if not a valid email', function () {
    const payload = {
      fullName: 'User Test',
      email: 'invalid',
      phone: '2038853291'
    }

    this.assert.throws(() => {
      register(payload)
    }, '"email" must be a valid email')
  })

  it('should throw error if not a valid phone number', function () {
    const payload = {
      fullName: 'User Test',
      email: 'test@email.com',
      phone: 'invalid'
    }

    this.assert.throws(() => {
      register(payload)
    }, '""phone"" did not seem to be a phone number')
  })
})
