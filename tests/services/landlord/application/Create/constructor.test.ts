import ApplicationCreate from '../../../../../src/services/landlord/application/Create'
import Email from '../../../../../src/services/Email'
describe('src/services/landlord/application/Create:constructor', function () {
  it('should resolve', async function () {
    const mockEmail = {
      send: this.sinon.spy()
    }
    this.container.fake(Email, mockEmail)

    const baseUrl = 'http://localhost:8000'
    const instance = new ApplicationCreate(baseUrl)
    this.assert.hasAllKeys(instance, ['_email', '_baseUrl'])
    this.assert.equal(instance['_baseUrl'], baseUrl)
  })
})
