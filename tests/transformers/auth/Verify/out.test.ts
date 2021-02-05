import Verify from '../../../../src/transformers/auth/Verify'

describe('src/transformers/auth/Verify:out', function () {
  it('should resolve', async function () {
    const payload: any = {
      user: {
        id: 'my-user',
        fullName: 'User Test',
        email: 'test@email.com',
        phone: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }
    const instance = new Verify()
    const result = instance.out(payload)
    this.assert.deepEqual(result, {
      user: {
        id: 'my-user',
        fullName: 'User Test',
        email: 'test@email.com',
        phone: '1234567890',
        createdAt: payload.user.createdAt.toISOString(),
        updatedAt: payload.user.updatedAt.toISOString()
      }
    })
  })
})
