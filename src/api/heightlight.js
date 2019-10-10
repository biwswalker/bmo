import express from 'express'
import _ from 'lodash'
import { plantService } from '@services'
import { RESPONSE_CODE, RESPONSE_STATUS } from '@constants'

const HIGHLIGHT_ENDPOINT = '/highlight'

const router = express.Router()

router.get(HIGHLIGHT_ENDPOINT, (req, res) => {
  console.log(`${HIGHLIGHT_ENDPOINT}...`)
  plantService.getPlant((plants, error) => {
    if (error) {
      return res
        .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
        .json({ code: RESPONSE_CODE.INTERNAL_SERVER_ERROR, status: RESPONSE_STATUS.FAILURE, error })
    }
    const plantWithRating = plants.map(plant => {
      const comments = _.get(plant, 'comments', [])
      let ratings = []
      _.map(comments, (comment) => {
        const userId = _.get(comment, 'userId', '')
        const rating = _.get(comment, 'rating', 0)
        if (_.isEmpty(userId)) { return }
        ratings.push(rating)
      })

      const rating = _.isEmpty(ratings) ? 0 : _.floor(_.mean(ratings))
      return { ..._.pick(plants, ['_id', 'name', 'images', 'tags']), rating }
    })
    const plantSorted = _.chunk(_.sortBy(plantWithRating, ['rating']).reverse(), 5);
    const highlight = _.get(plantSorted, '0', [])
    return res
      .status(RESPONSE_CODE.OK)
      .json({ code: RESPONSE_CODE.OK, status: RESPONSE_STATUS.SUCCESS, data: highlight })
  })
})

export default router