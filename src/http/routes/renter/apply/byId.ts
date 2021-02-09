import { Router } from 'express'
import container from '../../../../container'
import { byId as validate } from '../../../../services/renter/application/Retrieve/validate'
import Retrieve from '../../../../services/renter/application/Retrieve'
import applicationToJson from '../../../../transformers/application'

const router = Router({ mergeParams: true })

router.get('/', async function (req, res, next) {
  try {
    const form = validate({
      applicantId: req.params.applicantId
    })
    const retrieve = container.make<Retrieve>(Retrieve)
    const result = await retrieve.byId({
      user: res.locals.user,
      ...form
    })

    res.json(
      applicationToJson({
        application: result.application,
        applicants: [result.applicant]
      })
    )
  } catch (e) {
    next(e)
  }
})

export default router
