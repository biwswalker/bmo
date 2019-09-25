import _ from 'lodash'
import { User } from '@models/user'

const getCurrentUser = (userId, callback = () => { }) => {
  User.findById(userId)
    .then(response => {
      return callback(response)
    })
    .catch(error => {
      return callback(null, error)
    })
}

const enrollUser = async (user, callback = () => { }) => {
  const existingUser = await User.findOne({ email: user.email })
  if (!_.isEmpty(existingUser)) {
    return User.findByIdAndUpdate(existingUser._id, { name: user.name })
      .then(() => {
        const token = existingUser.generateToken()
        callback({ token, existingUser }, null)
      })
      .catch(error => {
        callback(null, error)
      })
  }

  const newUser = new User({
    name: user.name,
    email: user.email,
  })

  newUser.save()
    .then(user => {
      const token = newUser.generateToken()
      callback({ token, user }, null)
    })
    .catch(error => {
      callback(null, error)
    })
}

export default {
  getCurrentUser,
  enrollUser,
}