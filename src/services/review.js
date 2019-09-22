import { Plant } from '@models/plant'

const review = (_id, comment, callback = () => { }) => {
  Plant.findByIdAndUpdate(_id, { $push: { comments: comment } })
    .then(response => callback(response, null))
    .catch(error => callback(null, error))
}

export default {
  review
}