import { AxiosResponse } from 'axios'
import { RequestForm } from './types'

export default class RentPrepError extends Error {
  constructor(public response: AxiosResponse<RequestForm>) {
    super('Rentprep request failed with non 200')
  }
}
