import express from 'express'
import bodyParser from 'body-parser'
import api from '../api'

const route = express();
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({ extended: true }))

route.use('/api', api)

export default route