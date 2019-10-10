import { Garden } from '@models/garden'

const getGarden = (callback = () => { }) => {
  Garden.find()
    .then(response => callback(response, null))
    .catch(error => callback(null, error))
}

const getGardenById = (_id, callback = () => { }) => {
  Garden.findById(_id)
    .then(response => callback(response, null))
    .catch(error => callback(null, error))
}

const insertGarden = (gardenObj, callback = () => { }) => {
  const garden = new Garden(gardenObj)
  garden.save()
    .then(response => callback(response, null))
    .catch(error => callback(null, error))
}

export default {
  getGarden,
  getGardenById,
  insertGarden,
}