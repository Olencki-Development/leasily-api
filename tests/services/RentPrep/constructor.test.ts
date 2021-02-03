import RentPrep from '../../../src/services/RentPrep'

describe('src/services/RentPrep:constructor', function () {
  it('should resolve instance', async function () {
    const mockAxios: any = {
      post: this.sinon.stub()
    }
    const config = {
      isProd: false,
      apiKey: 'my-apiKey'
    }

    const instance = new RentPrep(config, mockAxios)
    this.assert.hasAllKeys(instance, ['_config', '_axios'])
    this.assert.equal(instance['_config'], config)
    this.assert.equal(instance['_axios'], mockAxios)
  })
})
