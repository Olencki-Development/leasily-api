import { Router } from 'express'
import applications from './applications'

const router = Router()

router.use('/applications', applications)

export default router
