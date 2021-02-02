import LeasilyError from './LeasilyError'

export default class ApplicationPendingError extends LeasilyError {
  constructor() {
    super(
      'All applicants have not completed their portion of the application.',
      400
    )
  }
}
