import container from '../../../../container'
import ApplicationsRetrieve from '../../../../services/landlord/application/Retrieve'
import { LeasilyContext } from '../../../types'
import ForbiddenError from '../../../../errors/ForbiddenError'
import applicationToJson from '../../../../transformers/application'

export default async function applications(
  _: any,
  __: any,
  context: LeasilyContext
) {
  const { user } = context
  if (!user) {
    throw new ForbiddenError()
  }

  const retrieve = container.make<ApplicationsRetrieve>(ApplicationsRetrieve)

  const result = await retrieve.all({
    user
  })

  return result.map((entities) => {
    return applicationToJson(entities)
  })
}
