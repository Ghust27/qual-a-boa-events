import vine from '@vinejs/vine'

export const createEventValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
    description: vine.string().optional(),
    location: vine.string().trim(),
    eventDate: vine
      .date({
        formats: ['YYYY-MM-DD HH:mm:ss', 'ISO8601'],
      })
      .after('today'),
    maxCapacity: vine.number().min(1),
  })
)

export const updateEventValidator = vine.compile(
  vine.object({
    // Note o .optional() no final de todos!
    name: vine.string().trim().minLength(3).optional(),
    description: vine.string().optional(),
    location: vine.string().trim().optional(),
    eventDate: vine
      .date({
        formats: ['YYYY-MM-DD HH:mm:ss', 'ISO8601'],
      })
      .after('today')
      .optional(),
    maxCapacity: vine.number().min(1).optional(),
  })
)
