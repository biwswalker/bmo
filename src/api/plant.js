import express from 'express'
import { RESPONSE_CODE, RESPONSE_STATUS } from '@constants'
import _ from 'lodash'
import { plantService } from '@services'

const GET_PLANT_ENDPOINT = '/plant'
const INSERT_PLANT_ENDPOINT = '/plant'
const PLANT_ENDPOINT = '/plant/:_id'

const router = express.Router()

router.get(GET_PLANT_ENDPOINT, (req, res) => {
  console.log(`${GET_PLANT_ENDPOINT}...`)
  plantService.getPlant((response, error) => {
    if (error) { return res.json({ code: RESPONSE_CODE.INTERNAL_SERVER_ERROR, status: RESPONSE_STATUS.FAILURE, error }) }
    return res.json({ code: RESPONSE_CODE.OK, status: RESPONSE_STATUS.SUCCESS, data: response })
  })
})

router.get(PLANT_ENDPOINT, (req, res) => {
  console.log(`${PLANT_ENDPOINT}...`)
  const _id = _.get(req.params, '_id');
  plantService.getPlantById(_id, (response, error) => {
    if (error) { return res.json({ code: RESPONSE_CODE.INTERNAL_SERVER_ERROR, status: RESPONSE_STATUS.FAILURE, error }) }
    return res.json({ code: RESPONSE_CODE.OK, status: RESPONSE_STATUS.SUCCESS, data: response, requestData: req.params })
  })
})

router.post(INSERT_PLANT_ENDPOINT, (req, res) => {
  console.log(`${INSERT_PLANT_ENDPOINT}...`)
  const name = _.get(req.body, 'name');
  const detail = _.get(req.body, 'detail');
  const images = _.get(req.body, 'images')
  const location = _.get(req.body, 'location') // { lat: 0, long: 0 }
  const tags = _.get(req.body, 'tags')
  const season = _.get(req.body, 'season')
  const rating = _.get(req.body, 'rating')
  const comments = _.get(req.body, 'comments', [])
  const category = _.get(req.body, 'category', '')
  // { rating: 3, name: '', comment: '', createtime: 1232323 }
  const plant = { name, detail, images, location, tags, season, rating, comments, category }
  plantService.insertPlant(plant, (response, error) => {
    if (error) { return res.json({ code: RESPONSE_CODE.INTERNAL_SERVER_ERROR, status: RESPONSE_STATUS.FAILURE, error }) }
    return res.json({ code: RESPONSE_CODE.OK, status: RESPONSE_STATUS.SUCCESS, data: response, requestData: plant })
  })
})

export default router

const garden_db = {
  id: '',
  name: '',
  detail: '',
  type: '',
  location: {
    lat: '',
    long: ''
  }
}