import { Router } from 'express'
import byId from './byId'

const router = Router()

router.use('/', byId)

export default router
