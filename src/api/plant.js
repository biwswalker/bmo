import express from 'express'
import { RESPONSE_CODE, RESPONSE_STATUS } from '@constants'
import _ from 'lodash'
import { plantService, userService, gardenService } from '@services'
import { authorization } from '@middlewares'

const GET_PLANT_ENDPOINT = '/plant'
const INSERT_PLANT_ENDPOINT = '/plant'
const PLANT_ENDPOINT = '/plant/:_id'

const router = express.Router()

router.get(GET_PLANT_ENDPOINT, (req, res) => {
  console.log(`${GET_PLANT_ENDPOINT}...`)
  plantService.getPlant((response, error) => {
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

router.get(PLANT_ENDPOINT, (req, res) => {
  console.log(`${PLANT_ENDPOINT}...`)
  const _id = _.get(req.params, '_id');
  plantService.getPlantById(_id, (response, error) => {
    console.log(response)
    if (error) {
      return res
        .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
        .json({ code: RESPONSE_CODE.INTERNAL_SERVER_ERROR, status: RESPONSE_STATUS.FAILURE, error })
    }
    if (_.isEmpty(response)) {
      return res
      .status(RESPONSE_CODE.NOT_FOUND)
      .json({ code: RESPONSE_CODE.NOT_FOUND, status: RESPONSE_STATUS.FAILURE, error: { message: `Plant not found ${_id}`} })
    }
    const gardenId = _.get(response, 'gardenId', '')

    // Get garden first
    gardenService.getGardenById(gardenId, (gardenData, error) => {
      if (error) {
        return res
          .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
          .json({ code: RESPONSE_CODE.INTERNAL_SERVER_ERROR, status: RESPONSE_STATUS.FAILURE, error })
      }
      const comments = _.get(response, 'comments', [])

      // Get comments
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
          const plantObject = _.pick(response, ['_id', 'name', 'scientificName',
            'familyName', 'anotherName', 'botanicalDetail',
            'properties', 'tags', 'images',
            'comments', 'gardenId'
          ])
          const data = {
            ...plantObject,
            rating,
            comments: _.sortBy(userComments, ['createtime']).reverse(),
            garden: gardenData,
          }
          return res
            .status(RESPONSE_CODE.OK)
            .json({ code: RESPONSE_CODE.OK, status: RESPONSE_STATUS.SUCCESS, data, requestData: req.params })
        })
        .catch(error => {
          return res
            .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
            .json({ code: RESPONSE_CODE.INTERNAL_SERVER_ERROR, status: RESPONSE_STATUS.FAILURE, error, requestData: req.params })
        })
    })

  })
})

// router.post(INSERT_PLANT_ENDPOINT, authorization, (req, res) => {
router.post(INSERT_PLANT_ENDPOINT, (req, res) => {
  console.log(`${INSERT_PLANT_ENDPOINT}...`)
  const name = _.get(req.body, 'name', '')
  const scientificName = _.get(req.body, 'scientificName', '')
  const familyName = _.get(req.body, 'familyName', '')
  const anotherName = _.get(req.body, 'anotherName', '')
  const botanicalDetail = _.get(req.body, 'botanicalDetail', '')
  const properties = _.get(req.body, 'properties', '')
  const tags = _.get(req.body, 'tags', [])
  const images = _.get(req.body, 'images', [])
  const comments = _.get(req.body, 'comments', [])
  const gardenId = _.get(req.body, 'gardenId', '')

  const plant = { name, scientificName, familyName, anotherName, botanicalDetail, properties, tags, images, comments, gardenId }

  plantService.insertPlant(plant, (response, error) => {
    if (error) {
      return res
        .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
        .json({ code: RESPONSE_CODE.INTERNAL_SERVER_ERROR, status: RESPONSE_STATUS.FAILURE, error, requestData: plant })
    }
    return res
      .status(RESPONSE_CODE.OK)
      .json({ code: RESPONSE_CODE.OK, status: RESPONSE_STATUS.SUCCESS, data: response })
  })
})

export default router