import RentPrep from '../../../src/services/RentPrep'
import RentPrepError from '../../../src/services/RentPrep/RentPrepError'

describe('src/services/RentPrep:fetchBackgroundcheck', function () {
  it('should throw when response status >= 400', async function () {
    const mockAxios: any = {
      post: this.sinon.stub().returns(
        Promise.resolve({
          status: 400
        })
      )
    }
    const config = {
      isProd: false,
      apiKey: 'my-apiKey'
    }
    const form: any = {}

    const instance = new RentPrep(config, mockAxios)

    try {
      await instance.fetchBackgroundcheck(form)
      throw new Error('Unit test failed')
    } catch (e) {
      this.assert.instanceOf(e, RentPrepError)
      this.assert.called(mockAxios.post)
    }
  })

  it('should resolve with isProd=true', async function () {
    const responseData: any = {
      key: 'value'
    }
    const mockAxios: any = {
      post: this.sinon.stub().returns(
        Promise.resolve({
          status: 200,
          data: responseData
        })
      )
    }
    const config = {
      isProd: true,
      apiKey: 'my-apiKey'
    }
    const form: any = {}

    const instance = new RentPrep(config, mockAxios)
    const result = await instance.fetchBackgroundcheck(form)
    this.assert.equal(result, responseData)
    this.assert.called(mockAxios.post)
  })

  it('should resolve with isProd=false', async function () {
    const responseData: any = {
      key: 'value'
    }
    const mockAxios: any = {
      post: this.sinon.stub().returns(
        Promise.resolve({
          status: 200,
          data: responseData
        })
      )
    }
    const config = {
      isProd: false,
      apiKey: 'my-apiKey'
    }
    const form: any = {}

    const instance = new RentPrep(config, mockAxios)
    const result = await instance.fetchBackgroundcheck(form)
    this.assert.equal(result, responseData)
    this.assert.called(mockAxios.post)
  })
})
