import express from 'express'
import bodyParser from 'body-parser'
import api from '../api'
import fileUpload from 'express-fileupload'

const route = express();
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({ extended: true }))
route.use(express.static('public'))
route.use(fileUpload({
  createParentPath: true,
  uriDecodeFileNames: true,
  safeFileNames: true,
}));

route.use('/api', api)

export default route