import jwt from 'jsonwebtoken'
import _ from 'lodash'

function authorization(req, res, next) {
  // Get token from header
  const token = req.headers['x-access-token'] || req.headers['authorization']

  // Check is have token
  if (_.isEmpty(token)) return res.status(401).send('Access denied. No token provided.')

  try {
    // Verify token
    const { _PRIVATE_KEY } = process.env
    const decoded = jwt.verify(token, _PRIVATE_KEY)
    req.user = decoded;
    next();
  } catch (ex) {
    //Invalid token
    res.status(400).send('Invalid token.')
  }
}

export default authorization