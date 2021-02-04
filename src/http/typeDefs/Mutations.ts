export default `
input RegisterForm {
  fullName: String!
  email: String!
  phone: String!
}

type Mutation {
  register(form: RegisterForm!): User!
}
`
