import * as Joi from 'joi'
import * as joiPhone from 'joi-phone-number'

const customJoi = Joi.extend(joiPhone as any)

export default customJoi
