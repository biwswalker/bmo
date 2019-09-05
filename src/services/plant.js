import { database } from '@config'

const { plant } = database

const getPlant = (callback) => {
  plant.find((error, docs) => {
    console.log('getPlant error: ', error)
    console.log('getPlant docs: ', docs)
    callback(docs, error)
  })
}

export default {
  getPlant
}