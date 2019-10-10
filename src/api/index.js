import express from 'express'
import heightlight from './heightlight'
import review from './review'
import upload from './upload'
import search from './search'
import garden from './garden'
import plant from './plant'
import user from './user'

const router = express.Router()

router.use('/', heightlight)
router.use('/', review)
router.use('/', upload)
router.use('/', search)
router.use('/', garden)
router.use('/', plant)
router.use('/', user)

export default router