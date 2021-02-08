import { Router } from 'express'
import container from '../../../../container'
import Create from '../../../../services/landlord/application/Create'
import { create as validate } from '../../../../services/landlord/application/Create/validate'
import applicationToJson from '../../../../transformers/application'

const router = Router()

router.post('/', async function (req, res, next) {
  try {
    const form = validate(req.body)
    const create = container.make<Create>(Create)
    const result = await create.create({
      user: res.locals.user,
      ...form
    })

    res.json(applicationToJson(result))
  } catch (e) {
    next(e)
  }
})

export default router
