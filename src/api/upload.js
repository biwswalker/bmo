import express from 'express'
import _ from 'lodash'
import mime from 'mime-types'
import { RESPONSE_CODE, RESPONSE_STATUS } from '@constants'

const UPLOAD = '/upload'

const router = express.Router()

router.post(UPLOAD, async (req, res) => {
  const file = _.get(req, 'files.file')
  const name = _.get(req, 'body.name', '')
  const location = _.get(req, 'body.location', '')
  const extension = mime.extension(_.get(file, 'mimetype', ''))
  console.log(`${UPLOAD}...`, extension, name, location)
  if (!req.files || _.keys(req.files).length === 0 || _.isEmpty(file)) {
    return res.status(RESPONSE_CODE.BAD_REQUEST).json({ code: RESPONSE_CODE.BAD_REQUEST, status: RESPONSE_STATUS.FAILURE, error: { message: 'No files were uploaded.' } });
  } else if (_.isEmpty(name)) {
    return res.status(RESPONSE_CODE.BAD_REQUEST).json({ code: RESPONSE_CODE.BAD_REQUEST, status: RESPONSE_STATUS.FAILURE, error: { message: 'No files name is require.' } });
  } else if (_.isEmpty(location)) {
    return res.status(RESPONSE_CODE.BAD_REQUEST).json({ code: RESPONSE_CODE.BAD_REQUEST, status: RESPONSE_STATUS.FAILURE, error: { message: 'No files location is require.' } });
  } else if (!extension) {
    return res.status(RESPONSE_CODE.BAD_REQUEST).json({ code: RESPONSE_CODE.BAD_REQUEST, status: RESPONSE_STATUS.FAILURE, error: { message: 'No files location is require.' } });
  }

  const filePath = `public/storage/images/${location}/${name}.${extension}`
  file.mv(filePath, function (error) {
    if (error) {
      console.log('Upload error...', error)
      return res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).json({ code: RESPONSE_CODE.INTERNAL_SERVER_ERROR, status: RESPONSE_STATUS.FAILURE, error });
    }
    const publicPath = `storage/images/${location}/${name}.${extension}`
    const url = req.protocol + '://' + req.get('host');
    const path = `${url}/${publicPath}`
    res.status(RESPONSE_CODE.OK).json({
      code: RESPONSE_CODE.OK,
      status: RESPONSE_STATUS.SUCCESS,
      data: { path },
      requestData: { name, location }
    });
  });
})

export default router
