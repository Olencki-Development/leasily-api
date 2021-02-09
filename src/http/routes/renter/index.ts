import { Router } from 'express'
import apply from './apply'

const router = Router()

router.use('/apply/:applicantId', apply)

export default router
