import { Router } from 'express'
import container from '../../../container'
import Auth from '../../../services/Auth'
import { verify as validate } from '../../../services/Auth/validate'
import userToJson from '../../../transformers/user'

const router = Router()

router.post('/', async function (req, res, next) {
  try {
    const form = validate(req.body)

    const auth = container.make<Auth>(Auth)
    const { user, token } = await auth.verify(form)

    res.json({
      user: userToJson({
        user
      }),
      token
    })
  } catch (e) {
    next(e)
  }
})

export default router
