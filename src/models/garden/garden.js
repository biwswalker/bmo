import mongoose from 'mongoose'
import GardenSchema from './schema'

const Garden = mongoose.model('garden', GardenSchema);

export default Garden