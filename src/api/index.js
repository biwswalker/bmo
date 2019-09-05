import express from 'express'
import heightlight from './heightlight'
import search from './search'

const router = express.Router()

router.use('/', heightlight)
router.use('/', search)

export default router