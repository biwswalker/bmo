import express from 'express'
import _ from 'lodash'
import { searchService } from '@services'
import { RESPONSE_CODE, RESPONSE_STATUS } from '@constants'

const SEARCH_ENDPOINT = '/search'

const router = express.Router()

router.get(SEARCH_ENDPOINT, (req, res) => {
  console.log(`${SEARCH_ENDPOINT}...`, req.query)
  const keyword = req.query.keyword
  if(_.isEmpty(keyword)){
    return res.json({ code: RESPONSE_CODE.OK, status: RESPONSE_STATUS.SUCCESS, data: [], requestData: keyword })
  }
  searchService.search(keyword, (response, error) => {
    if (error) { return res.json({ code: RESPONSE_CODE.INTERNAL_SERVER_ERROR, status: RESPONSE_STATUS.FAILURE, error, requestData: keyword }) }
    return res.json({ code: RESPONSE_CODE.OK, status: RESPONSE_STATUS.SUCCESS, data: response, requestData: keyword })
  })
})

export default router
