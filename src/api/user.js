import express from 'express'
import _ from 'lodash'
import { userService } from '@services'
import { authorization } from '@middlewares'
import { RESPONSE_CODE, RESPONSE_STATUS } from '@constants'
import { UserValidator } from '@models/user'

const GET_USER_ENDPOINT = '/user/me'
const USER_ENDPOINT = '/user'

const router = express.Router()

router.get(GET_USER_ENDPOINT, authorization, (req, res) => {
  console.log(`${USER_ENDPOINT}...`)

  const userId = req.user._id
  userService.getCurrentUser(userId, (response, error) => {
    if (error) { return res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).json({ code: RESPONSE_CODE.INTERNAL_SERVER_ERROR, status: RESPONSE_STATUS.FAILURE, error }) }
    return res.json({ code: RESPONSE_CODE.OK, status: RESPONSE_STATUS.SUCCESS, data: response })
  })
})

router.post(USER_ENDPOINT, async (req, res) => {
  console.log(`${USER_ENDPOINT}...`)

  const name = _.get(req.body, 'name')
  const email = _.get(req.body, 'email')
  const user = { name, email }

  const { error: invalid } = UserValidator(user)
  if (invalid) return res.status(RESPONSE_CODE.BAD_REQUEST).json({ code: RESPONSE_CODE.BAD_REQUEST, status: RESPONSE_STATUS.FAILURE, error: error.details[0].message });

  await userService.enrollUser(user, (response, error) => {
    if (error) {
      const errorCode = _.get(error, 'code', 0)
      const errorMessage = _.get(error, 'message', '')
      if (errorCode === RESPONSE_CODE.BAD_REQUEST) { return res.status(errorCode).json({ code: errorCode, status: RESPONSE_STATUS.FAILURE, error: { error, message: errorMessage } }) }
      return res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).json({ code: RESPONSE_CODE.INTERNAL_SERVER_ERROR, status: RESPONSE_STATUS.FAILURE, error })
    }

    const token = _.get(response, 'token', '')
    const enrolledUser = _.get(response, 'user', {})
    return res
      .header('x-auth-token', token)
      .status(RESPONSE_CODE.OK)
      .json({
        code: RESPONSE_CODE.OK,
        status: RESPONSE_STATUS.SUCCESS,
        data: { ...enrolledUser, token },
        requestData: user
      });
  })
})

export default router
