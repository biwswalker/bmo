import express from 'express'
import moment from 'moment'
import { RESPONSE_CODE, RESPONSE_STATUS } from '@constants'
import _ from 'lodash'
import { reviewService } from '@services'

const REVIEW_ENDPOINT = '/review'

const router = express.Router()

router.post(REVIEW_ENDPOINT, (req, res) => {
  console.log(`Insert ${REVIEW_ENDPOINT}...`)
  const _id = _.get(req.body, '_id')
  const name = _.get(req.body, 'name', '')
  const rating = _.get(req.body, 'rating', 0)
  const comment = _.get(req.body, 'comment', '')
  const createtime = moment().unix()
  const commentObject = { name, rating, comment, createtime }
  if (_.isEmpty(_id)) {
    return res.status(RESPONSE_CODE.BAD_REQUEST).json({ code: RESPONSE_CODE.BAD_REQUEST, status: RESPONSE_STATUS.FAILURE, error: 'Plant id is required!' })
  }
  reviewService.review(_id, commentObject, (response, error) => {
    if (error) { return res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).json({ code: RESPONSE_CODE.INTERNAL_SERVER_ERROR, status: RESPONSE_STATUS.FAILURE, error }) }
    return res.status(RESPONSE_CODE.OK).json({ code: RESPONSE_CODE.OK, status: RESPONSE_STATUS.SUCCESS, data: response, requestData: { _id, ...commentObject } })
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