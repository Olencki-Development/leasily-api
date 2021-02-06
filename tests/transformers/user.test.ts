import toJson from '../../src/transformers/user'

describe('src/transformers/user', function () {
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
    const result = toJson(payload)
    this.assert.deepEqual(result, {
      id: 'my-user',
      fullName: 'User Test',
      email: 'test@email.com',
      phone: '1234567890',
      createdAt: payload.user.createdAt.toISOString(),
      updatedAt: payload.user.updatedAt.toISOString()
    })
  })
})
