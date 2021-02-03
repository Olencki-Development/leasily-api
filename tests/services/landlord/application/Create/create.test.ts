import ApplicationCreate from '../../../../../src/services/landlord/application/Create'
import Email from '../../../../../src/services/Email'
describe('src/services/landlord/application/Create:create', function () {
  it('should resolve', async function () {
    const mockEmail = {
      send: this.sinon.spy()
    }
    this.container.fake(Email, mockEmail)

    const user = {
      id: 'my-user-applicant'
    }
    const User = {
      findOneOrCreate: this.sinon.stub().returns(Promise.resolve(user))
    }

    const application = {
      id: 'my-app',
      property: {
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '12345'
        },
        unit: 'Unit 1'
      }
    }
    const Application = {
      create: this.sinon.stub().returns(Promise.resolve(application))
    }

    const applicant = {
      user,
      application
    }
    const Applicant = {
      create: this.sinon.stub().returns(Promise.resolve(applicant))
    }

    const landlord = {
      id: 'my-landlord'
    }
    const Landlord = {
      create: this.sinon.stub().returns(Promise.resolve(landlord))
    }
    this.container.fake('models', {
      Application,
      Applicant,
      User,
      Landlord
    })

    const form: any = {
      property: {
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipcode: '12345'
        },
        unit: 'Unit 1'
      },
      lease: {
        securityDeposit: {
          amount: 1000,
          hasBeenCollected: false
        },
        rent: {
          amount: 1000
        },
        lengthInMonths: 12,
        startDate: new Date()
      },
      applicants: [
        {
          fullName: 'Applicant One',
          email: 'appliant@email.com',
          phone: '1234567890'
        }
      ],
      waitPeriodInDays: 5,
      fee: 35,
      user: {
        id: 'my-user'
      }
    }

    const baseUrl = 'http://localhost:8000'
    const instance = new ApplicationCreate(baseUrl)
    const result = await instance.create(form)
    this.assert.hasAllKeys(result, ['landlord', 'application', 'applicants'])

    this.assert.called(Application.create)
    this.assert.called(Applicant.create)
    this.assert.called(User.findOneOrCreate)
    this.assert.called(mockEmail.send)
    this.assert.called(Landlord.create)
  })
})
