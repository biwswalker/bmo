import mongoose from 'mongoose'
import PlantSchema from './schema'

const Plant = mongoose.model('plant', PlantSchema);

export default Plant