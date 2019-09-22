import { Plant } from '@models/plant'

const getPlant = (callback = () => { }) => {
  Plant.find()
    .then(response => callback(response, null))
    .catch(error => callback(null, error))
}

const getPlantById = (_id, callback = () => { }) => {
  Plant.findById(_id)
    .then(response => callback(response, null))
    .catch(error => callback(null, error))
}

const insertPlant = (plantObj, callback = () => { }) => {
  const plant = new Plant(plantObj)

  plant.save()
    .then(response => callback(response, null))
    .catch(error => callback(null, error))
}

export default {
  getPlant,
  getPlantById,
  insertPlant,
}