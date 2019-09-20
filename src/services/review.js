import mongo from 'mongojs'
import { database } from '@config'

const { plant } = database

const review = (_id, comment, callback = () => { }) => {
  const o_id = mongo.ObjectId(_id)
  plant.update(
    { _id: o_id },
    { $push: { comments: comment } },
    (error, datas) => {
      if (error) { return callback(null, error) }
      callback(datas, null)
    }
  )
}

export default {
  review
}