import Joi from 'joi'

function validate(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
  }

  return Joi.validate(user, schema)
}

export default validate