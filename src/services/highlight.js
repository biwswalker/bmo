import { Plant } from '@models/plant'

const getHighlightPlant = (season, callback = () => { }) => {
  Plant.find({ season: season })
    .then(response => callback(response, null))
    .catch(error => callback(null, error))
}

export default {
  getHighlightPlant
}