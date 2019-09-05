import router from '@routes'

const { _HOST, _PORT } = process.env
const host = _HOST || 'localhost'
const port = _PORT || 3000

router.listen(port, host, () => {
  console.log(`Service host:${host} port:${port}`)
})