import express from 'express'
import { plantService } from '@services'

const router = express.Router()

router.get('/search', (req, res) => {
  console.log('search...')
  plantService.getPlant((plant, error) => {
    res.json(plant)
  })
})

export default router