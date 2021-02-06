import { verify } from '../../../../src/services/Auth/validate'

describe('src/services/Auth/validate:verify', function () {
  it('should resolve', async function () {
    const payload = {
      email: 'test@email.com',
      code: '123456'
    }

    const result = verify(payload)
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

    this.assert.throws(() => {
      verify(payload)
    }, '"email" must be a valid email')
  })

  it('should throw error if code is not length 6', function () {
    const payload = {
      email: 'test@email.com',
      code: 'invalid'
    }

    this.assert.throws(() => {
      verify(payload)
    }, '"code" length must be 6 characters long')
  })
})
