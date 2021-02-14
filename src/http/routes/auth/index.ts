import { Router } from 'express'
import register from './register'
import login from './login'
import verify from './verify'
import me from './me'
import authorization from '../../authorization'

const router = Router()

router.use('/register', register)
router.use('/login', login)
router.use('/verify', verify)
router.use('/me', authorization, me)

export default router
