import { approve } from '../../../../../../src/services/landlord/application/Decision/validate'

describe('src/services/landlord/application/Decision/validate:approve', function () {
  it('should resolve', async function () {
    const payload = {
      applicationId: 'my_id'
    }

    const result = approve(payload)
    this.assert.deepEqual(result, {
      applicationId: 'my_id'
    })
  })
})
