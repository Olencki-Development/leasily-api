import Email from '../../../src/services/Email'

describe('src/services/Email:constructor', function () {
  it('should resolve instance', async function () {
    const mockClient: any = {
      send: this.sinon.spy()
    }
    const fromEmail = 'from@email.com'

    const instance = new Email(mockClient, fromEmail)
    this.assert.hasAllKeys(instance, ['_client', '_fromEmail'])
    this.assert.equal(instance['_fromEmail'], fromEmail)
    this.assert.equal(instance['_client'], mockClient)
  })
})
