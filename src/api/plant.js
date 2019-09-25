import express from 'express'
import { RESPONSE_CODE, RESPONSE_STATUS } from '@constants'
import _ from 'lodash'
import { plantService, userService } from '@services'
import { authorization } from '@middlewares'

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
    const comments = _.get(response, 'comments', [])

    let promiseCommentList = []
    let ratings = []
    _.map(comments, (comment) => {
      const userId = _.get(comment, 'userId', '')
      const rating = _.get(comment, 'rating', 0)
      if (_.isEmpty(userId)) { return }
      ratings.push(rating)
      const promise = new Promise((resolve, reject) => {
        userService.getCurrentUser(comment.userId, (response, error) => {
          if (error) { return reject(error) }
          const username = _.get(response, 'name', '')
          resolve({ ...comment, name: username })
        })
      })
      promiseCommentList.push(promise)
    })

    const rating = _.isEmpty(ratings) ? 0 : _.floor(_.mean(ratings))
    Promise.all(promiseCommentList)
      .then(userComments => {
        const plantObject = _.pick(response, ['_id', 'name', 'detail', 'images', 'location', 'tags', 'category', 'season'])
        const data = {
          ...plantObject,
          rating,
          comments: _.sortBy(userComments, ['createtime']).reverse()
        }
        return res.json({ code: RESPONSE_CODE.OK, status: RESPONSE_STATUS.SUCCESS, data, requestData: req.params })
      })
      .catch(error => {
        return res.json({ code: RESPONSE_CODE.INTERNAL_SERVER_ERROR, status: RESPONSE_STATUS.FAILURE, error })
      })
  })
})

router.post(INSERT_PLANT_ENDPOINT, authorization, (req, res) => {
  console.log(`${INSERT_PLANT_ENDPOINT}...`)
  const name = _.get(req.body, 'name');
  const detail = _.get(req.body, 'detail');
  const images = _.get(req.body, 'images')
  const location = _.get(req.body, 'location')
  const tags = _.get(req.body, 'tags')
  const season = _.get(req.body, 'season')
  const comments = _.get(req.body, 'comments', [])
  const category = _.get(req.body, 'category', '')

  const plant = { name, detail, images, location, tags, season, comments, category }
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