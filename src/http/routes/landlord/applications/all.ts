import { Router } from 'express'
import container from '../../../../container'
import Retrieve from '../../../../services/landlord/application/Retrieve'
import applicationToJson from '../../../../transformers/application'

const router = Router()

router.get('/', async function (req, res, next) {
  try {
    const retrieve = container.make<Retrieve>(Retrieve)
    const results = await retrieve.all({
      user: res.locals.user
    })

    res.json(results.map((result) => applicationToJson(result)))
  } catch (e) {
    next(e)
  }
})

export default router
