import Email from '../../../src/services/Email'

describe('src/services/Email:send', function () {
  it('should resolve instance', async function () {
    const mockClient: any = {
      send: this.sinon.spy()
    }
    const fromEmail = 'from@email.com'

    process.env.SUPPORT_EMAIL = 'test@email.com'

    const instance = new Email(mockClient, fromEmail)
    await instance.send({
      email: 'to@email.com',
      subject: 'My unit test',
      body: 'my body'
    })
    this.assert.called(mockClient.send)
  })
})
