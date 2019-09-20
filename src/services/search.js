import { database } from '@config'

const { plant } = database

const search = (keyword, callback = () => { }) => {
  plant.find({
    $or: [
      { name: { '$regex': keyword } },
      { detail: { '$regex': keyword } },
      { category: { '$regex': keyword } },
      { tags: { $elemMatch: { '$regex': keyword } }}
    ]
  }, (error, datas) => {
    if (error) { return callback(null, error) }
    callback(datas, null)
  })
}

export default {
  search
}