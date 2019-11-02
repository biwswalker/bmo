import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

// Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  }
});

// Custom method to generate authentication token 
UserSchema.methods.generateToken = function () {
  console.log('Generating token...')
  //get the private key from the config file -> environment variable
  const { PRIVATE_KEY } = process.env
  const token = jwt.sign({ _id: this._id }, PRIVATE_KEY);
  return token;
}

export default UserSchema