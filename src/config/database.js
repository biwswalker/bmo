import mongoose from 'mongoose'

const { MDB_URI, MONGO_URI } = process.env

const databaseUrl = MONGO_URI || MDB_URI

export default () => mongoose
  .connect(databaseUrl, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log(`Connected to Database...: ${databaseUrl}`))
  .catch(err => console.error('Could not connect to Database...', err));