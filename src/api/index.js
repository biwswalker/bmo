import express from 'express'
import heightlight from './heightlight'
import search from './search'
import plant from './plant'

const router = express.Router()

router.use('/', heightlight)
router.use('/', search)
router.use('/', plant)

export default router