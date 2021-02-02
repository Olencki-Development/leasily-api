export type FileAttachment = {
  content: any // base64
  filename: string
  type: string
  disposition: string
}

export type SendForm = {
  email: string
  subject: string
  body: string
  attachments?: FileAttachment[]
}
