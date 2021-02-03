import Verify from '../../../src/services/Verify'
import Email from '../../../src/services/Email'

describe('src/services/Verify:requestEmail', function () {
  it('should return code', async function () {
    const mockEmail: any = {
      send: this.sinon.spy()
    }
    this.container.fake(Email, mockEmail)

    const user: any = {
      id: 'my-id',
      email: 'test@email.com'
    }

    const instance = new Verify()
    const result = await instance.requestEmail({
      user
    })
    this.assert.isString(result)
    this.assert.hasAllKeys(instance['_codes'], ['my-id'])
    this.assert.hasAllKeys(instance['_codes']['my-id'], ['dateTime', 'code'])
    this.assert.equal(instance['_codes']['my-id'].code, result)
    this.assert.called(mockEmail.send)
  })
})
