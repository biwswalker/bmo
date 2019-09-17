import { database } from '@config'

const { plant } = database

const getHighlightPlant = (season, callback = () => { }) => {
  plant.find({ season: season }, (error, datas) => {
    if (error) { return callback(null, error) }
    callback(datas, null)
  })
}

export default {
  getHighlightPlant
}