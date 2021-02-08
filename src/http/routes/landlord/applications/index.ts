import { Router } from 'express'
import all from './all'
import create from './create'

const router = Router()

router.use('/', all)
router.use('/', create)

export default router
