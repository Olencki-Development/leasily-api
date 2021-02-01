import {
  RequestEmailForm,
  ValidateEmailForm,
  VerificationMatch,
  VerificationPayload
} from './types'
import Unauthorized from '../../errors/Unauthorized'
import container from '../../container'
import Email from '../Email'

const TEN_MINUTES_IN_MS = 600000

export default class Verify {
  private _codes: VerificationMatch = {}
  private _email: Email = container.make<Email>('email')

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
      throw new Unauthorized()
    }

    if (code !== payload.code) {
      throw new Unauthorized()
    }

    const now = new Date()
    const diffInMS = now.getTime() - payload.dateTime.getTime()
    if (diffInMS > TEN_MINUTES_IN_MS) {
      throw new Unauthorized()
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
