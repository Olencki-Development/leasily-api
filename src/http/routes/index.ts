import { Router } from 'express'
import auth from './auth'
import landlord from './landlord'
import renter from './renter'
import authorization from '../authorization'

const router = Router()

router.use('/auth', auth)

router.use(authorization)
router.use('/landlord', landlord)
router.use('/renter', renter)

export default router
