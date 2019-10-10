import express from 'express'
import _ from 'lodash'
import { searchService } from '@services'
import { RESPONSE_CODE, RESPONSE_STATUS } from '@constants'

const SUGGESTION_SEARCH_ENDPOINT = '/suggestion_search'
const SEARCH_ENDPOINT = '/search'

const router = express.Router()

router.get(SUGGESTION_SEARCH_ENDPOINT, (req, res) => {
  console.log(`${SUGGESTION_SEARCH_ENDPOINT}...`, req.query)
  const keyword = req.query.keyword
  if (_.isEmpty(keyword)) {
    return res.json({ code: RESPONSE_CODE.OK, status: RESPONSE_STATUS.SUCCESS, data: [], requestData: keyword })
  }
  searchService.suggestionSearch(keyword, (response, error) => {
    if (error) { return res.json({ code: RESPONSE_CODE.INTERNAL_SERVER_ERROR, status: RESPONSE_STATUS.FAILURE, error, requestData: keyword }) }
    const result = _.map(response, (res) => _.pick(res, ['_id', 'name']))
    return res.json({ code: RESPONSE_CODE.OK, status: RESPONSE_STATUS.SUCCESS, data: result, requestData: keyword })
  })
})

router.get(SEARCH_ENDPOINT, (req, res) => {
  console.log(`${SEARCH_ENDPOINT}...`, req.query)
  const keyword = req.query.keyword
  if (_.isEmpty(keyword)) {
    return res.json({ code: RESPONSE_CODE.OK, status: RESPONSE_STATUS.SUCCESS, data: [], requestData: keyword })
  }
  searchService.search(keyword, (response, error) => {
    if (error) { return res.json({ code: RESPONSE_CODE.INTERNAL_SERVER_ERROR, status: RESPONSE_STATUS.FAILURE, error, requestData: keyword }) }
    return res.json({ code: RESPONSE_CODE.OK, status: RESPONSE_STATUS.SUCCESS, data: response, requestData: keyword })
  })
})

export default router
