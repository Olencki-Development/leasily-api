import toJson from '../../src/transformers/result'

describe('src/transformers/result', function () {
  it('should resolve', async function () {
    const result = toJson('something')
    this.assert.deepEqual(result, {
      result: 'something'
    })
  })
})
