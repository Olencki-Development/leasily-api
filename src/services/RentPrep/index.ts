import { RentPrepConfig, BackgroundCheckForm } from './types'
import { AxiosStatic } from 'axios'
import RentPrepError from './RentPrepError'

export default class RentPrep {
  constructor(private _config: RentPrepConfig, private _axios: AxiosStatic) {}

  async fetchBackgroundcheck(form: BackgroundCheckForm) {
    const response = await this._request(form)

    if (response.status >= 400) {
      throw new RentPrepError(response)
    }

    return response.data
  }

  private _getBaseUrl(isProd: boolean): string {
    if (isProd) {
      return 'https://screen.rentprep.com'
    } else {
      return 'https://stage.rentprep.com'
    }
  }

  private _request(data: BackgroundCheckForm) {
    const url = `${this._getBaseUrl(
      this._config.isProd
    )}/api/screen/backgroundcheck`

    return this._axios.post<BackgroundCheckForm>(url, {
      headers: {
        'Content-Type': 'application/json',
        'x-apiKey': this._config.apiKey
      },
      data
    })
  }
}
