import LeasilyError from './LeasilyError'

export default class ApplicationCompleteError extends LeasilyError {
  constructor() {
    super(
      'This applicant has already completed the application. Unable to re-submit.',
      400
    )
  }
}
