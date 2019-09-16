import express from 'express'
import moment from 'moment'
import { times } from '@utils'
import { highlightService } from '@services'
import { RESPONSE_CODE, RESPONSE_STATUS } from '@constants'

const HIGHLIGHT_ENDPOINT = '/highlight'

const router = express.Router()

router.get(HIGHLIGHT_ENDPOINT, (req, res) => {
  const currentMonth = Number(moment().format('M'))
  const season = times.season(currentMonth)
  highlightService.getHighlightPlant(season.name, (response, error) => {
    if (error) { return res.json({ code: RESPONSE_CODE.INTERNAL_SERVER_ERROR, status: RESPONSE_STATUS.FAILURE, error }) }
    return res.json({ code: RESPONSE_CODE.OK, status: RESPONSE_STATUS.SUCCESS, data: response })
  })
})

export default router