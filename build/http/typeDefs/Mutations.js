"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
input RegisterForm {
  fullName: String!
  email: String!
  phone: String!
}

type Mutation {
  register(form: RegisterForm!): User!
}
`;
//# sourceMappingURL=Mutations.js.map