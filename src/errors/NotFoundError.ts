import LeasilyError from './LeasilyError'

export default class NotFoundError extends LeasilyError {
  constructor() {
    super('Not found.', 404)
  }
}
