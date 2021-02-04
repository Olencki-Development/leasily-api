import authRegister from './mutations/auth/register'
import authLogin from './mutations/auth/login'
import authVerify from './mutations/auth/verify'

import landlordApplications from './queries/landlord/applications'

export default {
  Query: {
    applications: landlordApplications
  },
  Mutation: {
    register: authRegister,
    login: authLogin,
    verify: authVerify
  }
}
