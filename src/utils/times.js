import { SEASONS } from '@constants'

const season = (month) => {
  const { RAINY, HOT, COOL } = SEASONS
  if (month >= RAINY.peroid.from && month <= RAINY.peroid.to) {
    return RAINY
  } else if (month >= HOT.peroid.from && month <= HOT.peroid.to) {
    return HOT
  } else if (month >= COOL.peroid.from && month <= 12 || month >= 1 && month <= HOT.peroid.to) {
    return COOL
  } else {
    return { name: '', peroid: { from: 0, to: 0 } }
  }
}

export default { season }