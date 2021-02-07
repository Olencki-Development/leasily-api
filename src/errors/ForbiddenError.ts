import LeasilyError from './LeasilyError'

export default class ForbiddenError extends LeasilyError {
  constructor() {
    super('Forbidden.', 403)
  }
}
