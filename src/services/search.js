import { Plant } from '@models/plant'

const suggestionSearch = (keyword, callback = () => { }) => {
  Plant.find({
    $or: [
      { name: { '$regex': keyword } },
      { botanicalDetail: { '$regex': keyword } },
      { scientificName: { '$regex': keyword } },
      { familyName: { '$regex': keyword } },
      { anotherName: { '$regex': keyword } },
      { properties: { '$regex': keyword } },
      { tags: { $elemMatch: { '$regex': keyword } } }
    ]
  })
    .then(response => callback(response, null))
    .catch(error => callback(null, error))
}

const search = (keyword, callback = () => { }) => {
  Plant.find({ name: keyword })
    .then(response => callback(response, null))
    .catch(error => callback(null, error))
}

export default {
  suggestionSearch,
  search
}