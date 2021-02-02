import { ContainerInterface } from '@halliganjs/service-container'
import RentPrep from '../services/RentPrep'
import axios from 'axios'

export default function (container: ContainerInterface) {
  container.instance('axios', axios)

  container.singleton('rentprep', function () {
    const isProd = process.env.RENT_PREP_IS_PROD
    const apiKey = process.env.RENT_PREP_API_KEY
    if (!apiKey) {
      throw new Error('RENT_PREP_API_KEY has not been set')
    }

    const rentprep = new RentPrep(
      {
        isProd: !!isProd,
        apiKey
      },
      axios
    )

    return rentprep
  })
}
