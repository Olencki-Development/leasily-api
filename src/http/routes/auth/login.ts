import { Router } from 'express'
import container from '../../../container'
import Auth from '../../../services/Auth'
import { login as validate } from '../../../services/Auth/validate'
import result from '../../../transformers/result'

const router = Router()

router.post('/', async function (req, res, next) {
  try {
    const form = validate(req.body)

    const auth = container.make<Auth>(Auth)
    await auth.login(form)

    res.json(result('Verification token sent.'))
  } catch (e) {
    next(e)
  }
})

export default router
