export type RegisterForm = {
  fullName: string
  email: string
  phone: string
}

export type LoginForm = {
  email: string
}

export type VerifyForm = {
  email: string
  code: string
}
