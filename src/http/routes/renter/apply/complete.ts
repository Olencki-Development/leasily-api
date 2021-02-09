import { Router } from 'express'
import container from '../../../../container'
import { complete as validate } from '../../../../services/renter/application/Apply/validate'
import Apply from '../../../../services/renter/application/Apply'
import applicationToJson from '../../../../transformers/application'

const router = Router({ mergeParams: true })

router.post('/', async function (req, res, next) {
  try {
    const form = validate({
      applicantId: req.params.applicantId,
      ...req.body
    })
    const apply = container.make<Apply>(Apply)
    const result = await apply.complete({
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
