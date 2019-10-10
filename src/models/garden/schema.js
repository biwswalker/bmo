import mongoose from 'mongoose'

// Schema
const GardenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },
  },
  images: [String],
});

export default GardenSchema