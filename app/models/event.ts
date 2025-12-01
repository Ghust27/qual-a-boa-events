import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Registration from '#models/registration'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare organizerId: number

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column()
  declare location: string

  @column()
  declare maxCapacity: number

  @column.dateTime()
  declare eventDate: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'organizerId',
  })
  declare organizer: BelongsTo<typeof User>

  @hasMany(() => Registration)
  declare registrations: HasMany<typeof Registration>
}
