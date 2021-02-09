import { Router } from 'express'
import all from './all'
import create from './create'
import background from './background'

const router = Router()

router.use('/', all)
router.use('/', create)
router.use('/:applicationId/background', background)

export default router
