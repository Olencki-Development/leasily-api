import { Router } from 'express'
import userToJson from '../../../transformers/user'

const router = Router()

router.get('/', async function (req, res, next) {
  try {
    res.json({
      user: userToJson({
        user: res.locals.user
      }),
      token: res.locals.token
    })
  } catch (e) {
    next(e)
  }
})

export default router
