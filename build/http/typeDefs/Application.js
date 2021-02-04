"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
enum APPLICATION_STAGES {
  AWAITING_COMPLETION
  REQUESTING_BACKGROUND_CHECK
  AWAITING_APPLICATION_REVIEW
  RENTED
}

type Application {
  id: ID!
  property: Property!
  applicants: [Applicant]!
  stage: APPLICATION_STAGES!
  isClosed: Boolean!
  lease: Lease!
  createdAt: String!
  updatedAt: String!
}
`;
//# sourceMappingURL=Application.js.map