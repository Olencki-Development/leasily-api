import { ResultMessageJson } from './types'

export default function toJson(message: string): ResultMessageJson {
  return {
    result: message
  }
}
