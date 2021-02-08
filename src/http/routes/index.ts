import { Router } from 'express'
import auth from './auth'
import landlord from './landlord'
import authorization from '../authorization'

const router = Router()

router.use('/auth', auth)

router.use(authorization)
router.use('/landlord', landlord)

export default router
