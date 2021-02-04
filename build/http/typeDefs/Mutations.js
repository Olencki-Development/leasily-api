"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
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
`;
//# sourceMappingURL=Mutations.js.map