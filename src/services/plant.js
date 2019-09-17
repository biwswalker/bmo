import mongo from 'mongojs'
import { database } from '@config'

const { plant } = database

const getPlant = (callback = () => { }) => {
  plant.find((error, plantResponse) => {
    if (error) { return callback(null, error) }
    return callback(plantResponse, null)
  })
}

const getPlantById = (_id, callback = () => { }) => {
  const o_id = mongo.ObjectId(_id)
  plant.findOne({ _id: o_id }, (error, plantResponse) => {
    if (error) { return callback(null, error) }
    return callback(plantResponse, null)
  })
}

const insertPlant = (plantObj, callback) => {
  plant.save(plantObj, (error, plantResponse) => {
    if (error) { return callback(null, error) }
    return callback(plantResponse, null)
  })
}

export default {
  getPlant,
  getPlantById,
  insertPlant,
}