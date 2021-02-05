import Login from '../../../../src/transformers/auth/Login'

describe('src/transformers/auth/Login:out', function () {
  it('should resolve', async function () {
    const instance = new Login()
    const result = instance.out()
    this.assert.deepEqual(result, {})
  })
})
