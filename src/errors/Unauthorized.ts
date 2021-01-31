import LeasilyError from './LeasilyError'

export default class UnauthorizedError extends LeasilyError {
  constructor() {
    super('Unauthorized.', 401)
  }
}
