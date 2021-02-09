import { Router } from 'express'
import byId from './byId'
import complete from './complete'

const router = Router({ mergeParams: true })

router.use('/', byId)
router.use('/', complete)

export default router
