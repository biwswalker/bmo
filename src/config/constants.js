export const RESPONSE_CODE = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
}

export const RESPONSE_STATUS = {
  SUCCESS: 'success',
  FAILURE: 'failure',
}

export const SEASONS = {
  RAINY: {
    name: 'Rainy', 
    peroid: {
      from: 7,
      to: 10
    }
  },
  HOT: {
    name: 'Hot', 
    peroid: {
      from: 3,
      to: 6
    }
  },
  COOL: {
    name: 'Cool',
    peroid: {
      from: 11,
      to: 2
    }
  },
}