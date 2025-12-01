import Registration from '#models/registration'
import db from '@adonisjs/lucid/services/db'

export default class RegistrationsRepository {
  async create(userId: number, eventId: number): Promise<Registration> {
    return await Registration.create({ userId, eventId })
  }

  async isUserRegistered(userId: number, eventId: number): Promise<boolean> {
    const registration = await Registration.query()
      .where('user_id', userId)
      .andWhere('event_id', eventId)
      .first()

    return !!registration
  }

  async countParticipants(eventId: number): Promise<number> {
    const result = await Registration.query().where('event_id', eventId).count('* as total')
    return result[0].$extras.total
  }

  async hasTimeConflict(userId: number, eventDate: string): Promise<boolean> {
    const conflict = await db
      .from('registrations')
      .join('events', 'registrations.event_id', 'events.id')
      .where('registrations.user_id', userId)
      .andWhere('events.event_date', eventDate)
      .first()
    return !!conflict
  }

  async getUserRegistrations(userId: number) {
    return await Registration.query().where('user_id', userId).preload('event')
  }
}
