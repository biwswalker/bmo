import express from 'express'
import heightlight from './heightlight'
import review from './review'
import search from './search'
import plant from './plant'

const router = express.Router()

router.use('/', heightlight)
router.use('/', review)
router.use('/', search)
router.use('/', plant)

export default router