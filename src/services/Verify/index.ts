import { RequestEmailForm, ValidateEmailForm } from './types'
import Unauthorized from '../../errors/Unauthorized'

export default class Verify {
  private _codes: Record<string, string> = {}

  async requestEmail(form: RequestEmailForm) {
    const code = this._getCode()

    this._codes[form.user.id] = code

    // TOOD: implement send email with code

    return code
  }

  validateEmail(form: ValidateEmailForm): boolean {
    const code = this._codes[form.user.id]
    if (code !== form.code) {
      throw new Unauthorized()
    }

    delete this._codes[form.user.id]

    // TOOD: implement token timeout check

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
}
