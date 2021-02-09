import { Router } from 'express'
import container from '../../../../container'
import BackgroundCheck from '../../../../services/landlord/BackgroundCheck'
import { request as validate } from '../../../../services/landlord/BackgroundCheck/validate'
import applicationToJson from '../../../../transformers/application'

const router = Router({ mergeParams: true })

router.post('/', async function (req, res, next) {
  try {
    const form = validate({
      applicationId: req.params.applicationId,
      ...req.body
    })
    const background = container.make<BackgroundCheck>(BackgroundCheck)
    const result = await background.request({
      user: res.locals.user,
      ...form
    })

    res.json(applicationToJson(result))
  } catch (e) {
    next(e)
  }
})

export default router
