import router from '@routes'
import { database } from '@config'

const { PORT, PRIVATE_KEY } = process.env
const port = PORT || 3000
const privatekey = PRIVATE_KEY || ''

//use config module to get the privatekey, if no private key set, end the application
if (!privatekey) {
  console.error('FATAL ERROR: privatekey is not defined.');
  process.exit(1);
}

// Initial Database
database()

router.listen(port, () => {
  console.log(`Service port:${port}`)
})