import mongoose from 'mongoose'

const { _DB_HOST, _DB_PORT, _DB_NAME } = process.env

const dbHost = _DB_HOST || 'localhost'
const dbPort = _DB_PORT || 27017
const dbName = _DB_NAME || ''
const databaseUrl = `mongodb://${dbHost}:${dbPort}/${dbName}`

export default () => mongoose
  .connect(databaseUrl, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log('Connected to Database...'))
  .catch(err => console.error('Could not connect to Database...'));