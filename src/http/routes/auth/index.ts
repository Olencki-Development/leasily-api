import { Router } from 'express'
import register from './register'
import login from './login'
import verify from './verify'

const router = Router()

router.use('/register', register)
router.use('/login', login)
router.use('/verify', verify)

export default router
