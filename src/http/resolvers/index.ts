import authRegister from './mutations/auth/register'
import authLogin from './mutations/auth/login'
import authVerify from './mutations/auth/verify'

export default {
  Query: {},
  Mutation: {
    register: authRegister,
    login: authLogin,
    verify: authVerify
  }
}
