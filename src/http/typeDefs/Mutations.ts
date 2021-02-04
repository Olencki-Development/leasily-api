export default `
input RegisterForm {
  fullName: String!
  email: String!
  phone: String!
}

input LoginForm {
  email: String!
}

input VerifyForm {
  email: String!
  code: String!
}

type Mutation {
  register(form: RegisterForm!): User!
  login(form: LoginForm!): User!
  verify(form: VerifyForm!): User!
}
`
