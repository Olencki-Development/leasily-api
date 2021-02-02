import { AxiosResponse } from 'axios'
import { BackgroundCheckForm } from './types'

export default class RentPrepError extends Error {
  constructor(public response: AxiosResponse<BackgroundCheckForm>) {
    super('Rentprep request failed with non 200')
  }
}
