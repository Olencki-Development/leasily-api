import { byId } from '../../../../../../src/services/landlord/application/Retrieve/validate'

describe('src/services/landlord/application/Retrieve/validate:byId', function () {
  it('should resolve', async function () {
    const payload = {
      applicationId: 'my_id'
    }

    const result = byId(payload)
    this.assert.deepEqual(result, {
      applicationId: 'my_id'
    })
  })
})
