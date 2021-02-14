import { Request, Response } from 'express'
import container from '../container'
import Auth from '../services/Auth'
import ForbiddenError from '../errors/ForbiddenError'

export default async function authorization(
  req: Request,
  res: Response,
  next: Function
) {
  try {
    const authorization = req.headers.authorization
    if (!authorization) {
      throw new ForbiddenError()
    }

    const aryAuth = authorization.split(' ')
    if (aryAuth.length !== 2) {
      throw new ForbiddenError()
    }

    const token = aryAuth[1]
    const auth = container.make<Auth>(Auth)

    const user = await auth.validate({
      token
    })

    res.locals = {
      user,
      token
    }

    return next()
  } catch (e) {
    next(e)
  }
}
