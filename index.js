import router from '@routes'
import { database } from '@config'

const { _HOST, _PORT, _PRIVATE_KEY } = process.env
const host = _HOST || 'localhost'
const port = _PORT || 3000
const privatekey = _PRIVATE_KEY || ''

//use config module to get the privatekey, if no private key set, end the application
if (!privatekey) {
  console.error('FATAL ERROR: privatekey is not defined.');
  process.exit(1);
}

// Initial Database
database()

router.listen(port, host, () => {
  console.log(`Service host:${host} port:${port}`)
})