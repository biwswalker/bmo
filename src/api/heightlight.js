import express from 'express'
import moment from 'moment'
import _ from 'lodash'
import { times } from '@utils'
import { highlightService } from '@services'
import { RESPONSE_CODE, RESPONSE_STATUS } from '@constants'

const HIGHLIGHT_ENDPOINT = '/highlight'

const router = express.Router()

router.get(HIGHLIGHT_ENDPOINT, (req, res) => {
  console.log(`${HIGHLIGHT_ENDPOINT}...`)
  const currentMonth = Number(moment().format('M'))
  const season = times.season(currentMonth)
  highlightService.getHighlightPlant(season.name, (response, error) => {
    if (error) { return res.json({ code: RESPONSE_CODE.INTERNAL_SERVER_ERROR, status: RESPONSE_STATUS.FAILURE, error }) }
    const highlight = response.map(highlightResponse => _.pick(highlightResponse, ['_id', 'name', 'images', 'tags']))
    return res.json({ code: RESPONSE_CODE.OK, status: RESPONSE_STATUS.SUCCESS, data: highlight })
  })
})

export default router