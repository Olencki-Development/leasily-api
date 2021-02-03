import ApplicationApply from '../../../../../src/services/renter/application/Apply'
import Email from '../../../../../src/services/Email'

describe('src/services/renter/application/Apply:constructor', function () {
  it('should resolve instance', async function () {
    const mockEmail = {
      send: this.sinon.spy()
    }
    this.container.fake(Email, mockEmail)

    const baseUrl = 'http://localhost:8000'
    const apply = new ApplicationApply(baseUrl)
    this.assert.hasAllKeys(apply, ['_email', '_baseUrl'])
    this.assert.equal(apply['_baseUrl'], baseUrl)
  })
})
