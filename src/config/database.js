import mongo from 'mongojs'

const { _DB_HOST, _DB_PORT, _DB_NAME } = process.env

const dbHost = _DB_HOST || 'localhost'
const dbPort = _DB_PORT || 27017
const dbName = _DB_NAME || ''
const databaseUrl = `${dbHost}:${dbPort}/${dbName}`

const collection = [
  "plant",
]

const db = mongo(databaseUrl, collection)

export default db