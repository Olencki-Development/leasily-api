import LeasilyError from './LeasilyError'

export default class ApplicationResolvedError extends LeasilyError {
  constructor() {
    super(
      'A decision has already been made for this application. Unable to modify the application.',
      400
    )
  }
}
