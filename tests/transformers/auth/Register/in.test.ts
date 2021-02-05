import Register from '../../../../src/transformers/auth/Register'

describe('src/services/RentPrep:in', function () {
  it('should resolve', async function () {
    const payload = {
      fullName: 'User Test',
      email: 'test@email.com',
      phone: '2038853291'
    }

    const instance = new Register()
    const result = instance.in(payload)
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

    const instance = new Register()
    this.assert.throws(() => {
      instance.in(payload)
    }, '"email" must be a valid email')
  })

  it('should throw error if not a valid phone number', function () {
    const payload = {
      fullName: 'User Test',
      email: 'test@email.com',
      phone: 'invalid'
    }

    const instance = new Register()
    this.assert.throws(() => {
      instance.in(payload)
    }, '""phone"" did not seem to be a phone number')
  })
})
