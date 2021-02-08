import { Request, Response } from 'express'
import { ValidationError } from 'joi'
import LeasilyError from '../errors/LeasilyError'
import { MongoError } from 'mongodb'

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: Function
) {
  if (err instanceof ValidationError) {
    return res.status(400).json({
      statusCode: 400,
      message: err.message,
      details: {}
    })
  }

  if (err instanceof LeasilyError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      details: {}
    })
  }

  if (err instanceof MongoError) {
    if (err.message.includes('duplicate key error')) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Item already exists',
        keyValue: (err as any).keyValue || {}
      })
    }
  }

  console.error(err)
  return res.status(500).json({
    statusCode: 500,
    message: 'An internal server error has occured.'
  })
}
