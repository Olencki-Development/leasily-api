import { RentPrepConfig, BackgroundCheckForm, RequestForm } from './types'
import { AxiosStatic } from 'axios'
import RentPrepError from './RentPrepError'

export default class RentPrep {
  private _config: RentPrepConfig
  private _axios: AxiosStatic

  constructor(config: RentPrepConfig, axios: AxiosStatic) {
    this._config = config
    this._axios = axios
  }

  async fetchBackgroundcheck(form: BackgroundCheckForm) {
    const response = await this._request({
      ...form,
      RequestParameters: this._config.RequestParameters
    })

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

  private _request(data: RequestForm) {
    const url = `${this._getBaseUrl(
      this._config.isProd
    )}/api/screen/backgroundcheck`

    return this._axios.post<RequestForm>(url, {
      headers: {
        'Content-Type': 'application/json',
        'x-apiKey': this._config.apiKey
      },
      data
    })
  }
}
