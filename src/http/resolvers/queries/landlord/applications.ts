import container from '../../../../container'
import ApplicationsRetrieve from '../../../../services/landlord/application/Retrieve'
import { LeasilyContext } from '../../../types'

export default async function applications(
  _: any,
  __: any,
  context: LeasilyContext
) {
  const { user } = context

  const retrieve = container.make<ApplicationsRetrieve>(ApplicationsRetrieve)

  const result = await retrieve.all({
    user
  })

  return result.reduce((json: Record<string, any>[], item) => {
    const temp = {
      ...item.application.toJSON(),
      applicants: item.applicants.map((applicant) => applicant.toJSON())
    }
    json.push(temp)
    return json
  }, [])
}
