export default class LeasilyError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number = 400) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
  }
}
