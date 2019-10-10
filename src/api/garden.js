import express from 'express'
import { RESPONSE_CODE, RESPONSE_STATUS } from '@constants'
import _ from 'lodash'
import { gardenService, plantService } from '@services'
import { authorization } from '@middlewares'

const GET_GARDEN_ENDPOINT = '/garden'
const INSERT_GARDEN_ENDPOINT = '/garden'
const GET_GARDEN_ID_ENDPOINT = '/garden/:_id'
const GET_GARDEN_PLANT_ENDPOINT = '/garden/plant/:_id'

const router = express.Router()

router.get(GET_GARDEN_ENDPOINT, (req, res) => {
  console.log(`${GET_GARDEN_ENDPOINT}...`)
  gardenService.getGarden((response, error) => {
    if (error) {
      return res
        .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
        .json({ code: RESPONSE_CODE.INTERNAL_SERVER_ERROR, status: RESPONSE_STATUS.FAILURE, error })
    }
    return res
      .status(RESPONSE_CODE.OK)
      .json({ code: RESPONSE_CODE.OK, status: RESPONSE_STATUS.SUCCESS, data: response })
  })
})

router.get(GET_GARDEN_PLANT_ENDPOINT, (req, res) => {
  console.log(`${GET_GARDEN_PLANT_ENDPOINT}...`)
  const _id = _.get(req.params, '_id');
  plantService.getGardenPlant(_id, (response, error) => {
    if (error) {
      return res
        .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
        .json({ code: RESPONSE_CODE.INTERNAL_SERVER_ERROR, status: RESPONSE_STATUS.FAILURE, error })
    }
    return res
      .status(RESPONSE_CODE.OK)
      .json({ code: RESPONSE_CODE.OK, status: RESPONSE_STATUS.SUCCESS, data: response })
  })
})

router.get(GET_GARDEN_ID_ENDPOINT, (req, res) => {
  console.log(`${GET_GARDEN_ID_ENDPOINT}...`)
  const _id = _.get(req.params, '_id');
  gardenService.getGardenById(_id, (response, error) => {
    if (error) {
      return res
        .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
        .json({ code: RESPONSE_CODE.INTERNAL_SERVER_ERROR, status: RESPONSE_STATUS.FAILURE, error })
    }
    return res
      .status(RESPONSE_CODE.OK)
      .json({ code: RESPONSE_CODE.OK, status: RESPONSE_STATUS.SUCCESS, data: response })
  })
})

// router.post(INSERT_GARDEN_ENDPOINT, authorization, (req, res) => {
router.post(INSERT_GARDEN_ENDPOINT, (req, res) => {
  console.log(`${INSERT_GARDEN_ENDPOINT}...`)
  const name = _.get(req.body, 'name', '')
  const nameEN = _.get(req.body, 'nameEN', '')
  const location = _.get(req.body, 'location', {})
  const images = _.get(req.body, 'images', '')

  const garden = { name, nameEN, location, images }
  gardenService.insertGarden(garden, (response, error) => {
    if (error) {
      return res
        .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
        .json({ code: RESPONSE_CODE.INTERNAL_SERVER_ERROR, status: RESPONSE_STATUS.FAILURE, error })
    }
    return res
      .status(RESPONSE_CODE.OK)
      .json({ code: RESPONSE_CODE.OK, status: RESPONSE_STATUS.SUCCESS, data: response })
  })
})

export default router