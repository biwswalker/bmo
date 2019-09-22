import mongoose from 'mongoose'

// Schema
const PlantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255
  },
  detail: {
    type: String,
    required: true,
  },
  tags: [String],
  images: [String],
  season: String,
  rating: Number,
  comments: Array,
  category: String,
  location: {
    lat: String,
    long: String,
  },
});

export default PlantSchema