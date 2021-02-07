import { Request, Response } from 'express'
import { ValidationError } from 'joi'
import LeasilyError from '../errors/LeasilyError'

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: Function
) {
  if (err instanceof ValidationError) {
    return res.status(400).json({
      statusCode: 400,
      message: err.message
    })
  }

  if (err instanceof LeasilyError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message
    })
  }

  console.error(err)
  return res.status(500).json({
    statusCode: 500,
    message: 'An internal server error has occured.'
  })
}
