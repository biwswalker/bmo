import jwt from 'jsonwebtoken'
import _ from 'lodash'
import { RESPONSE_CODE, RESPONSE_STATUS } from '@constants'

function authorization(req, res, next) {
  // Get token from header
  const token = req.headers['x-access-token'] || req.headers['authorization']

  // Check is have token
  if (_.isEmpty(token)) return res.status(RESPONSE_CODE.UNAUTHORIZED).send({ code: RESPONSE_CODE.UNAUTHORIZED, status: RESPONSE_STATUS.FAILURE, error: { message: 'Access denied. No token provided.' } })

  try {
    // Verify token
    const { PRIVATE_KEY } = process.env
    const decoded = jwt.verify(token, PRIVATE_KEY)
    req.user = decoded;
    next();
  } catch (ex) {
    //Invalid token
    res.status(RESPONSE_CODE.BAD_REQUEST).json({ code: RESPONSE_CODE.BAD_REQUEST, status: RESPONSE_STATUS.FAILURE, error: { message: 'Invalid token.' } })
  }
}

export default authorization