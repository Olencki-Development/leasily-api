import Register from '../../../../src/transformers/auth/Register'

describe('src/transformers/auth/Register:out', function () {
  it('should resolve', async function () {
    const instance = new Register()
    const result = instance.out()
    this.assert.deepEqual(result, {})
  })
})