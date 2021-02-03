import {
  RequestEmailForm,
  ValidateEmailForm,
  VerificationMatch,
  VerificationPayload
} from './types'
import UnauthorizedError from '../../errors/Unauthorized'
import container from '../../container'
import Email from '../Email'

export default class Verify {
  private static TEN_MINUTES_IN_MS = 600000
  private _codes: VerificationMatch = {}
  private _email: Email = container.make<Email>(Email)

  async requestEmail(form: RequestEmailForm) {
    const code = this._getCode()
    this._setCodeForId(form.user.id, code)

    await this._sendVerifyEmail(form.user.email, code)

    return code
  }

  validateEmail(form: ValidateEmailForm): boolean {
    this._getPayloadForIdAndCode(form.user.id, form.code)

    delete this._codes[form.user.id]

    return true
  }

  private _getCode(length = 6): string {
    let result = ''
    const characters = '0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  private _setCodeForId(id: string, code: string) {
    this._codes[id] = {
      dateTime: new Date(),
      code
    }
  }

  private _getPayloadForIdAndCode(
    id: string,
    code: string
  ): VerificationPayload {
    const payload = this._codes[id]
    if (!payload) {
      throw new UnauthorizedError()
    }

    if (code !== payload.code) {
      throw new UnauthorizedError()
    }

    const now = new Date()
    const diffInMS = now.getTime() - payload.dateTime.getTime()
    if (diffInMS > Verify.TEN_MINUTES_IN_MS) {
      throw new UnauthorizedError()
    }

    return payload
  }

  private async _sendVerifyEmail(email: string, code: string) {
    await this._email.send({
      email,
      subject: 'Leasily Verification Code',
      body: `
        Your Leasily verification code is:
        ${code}

        * This code will expire after 10 minutes.
      `
    })
  }
}
