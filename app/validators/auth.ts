import vine from '@vinejs/vine'

export const registerUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3),
    email: vine.string().email().normalizeEmail(),
    password: vine.string().minLength(6),
    cpf: vine.string().optional(),
    role: vine.enum(['ORGANIZER', 'PARTICIPANT']),
  })
)

export const loginUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3).optional(),
    password: vine.string().minLength(6).optional(),
    cpf: vine.string().optional(),
  })
)
