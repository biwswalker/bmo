import mongoose from 'mongoose'

// Schema
const PlantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255
  },
  scientificName: {
    type: String,
    maxlength: 255
  },
  familyName: {
    type: String,
    maxlength: 255
  },
  anotherName: {
    type: String,
    maxlength: 255
  },
  botanicalDetail: {
    type: String,
  },
  properties: {
    type: String,
  },
  tags: [String],
  gardenId: {
    type: String,
    required: true,
  },
  images: [String],
  comments: Array,
});

export default PlantSchema