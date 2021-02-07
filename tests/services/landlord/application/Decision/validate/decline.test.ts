import { decline } from '../../../../../../src/services/landlord/application/Decision/validate'

describe('src/services/landlord/application/Decision/validate:decline', function () {
  it('should resolve', async function () {
    const payload = {
      applicationId: 'my_id'
    }

    const result = decline(payload)
    this.assert.deepEqual(result, {
      applicationId: 'my_id'
    })
  })
})
