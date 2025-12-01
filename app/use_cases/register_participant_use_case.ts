import RegistrationsRepository from '#repositories/registrations_repository'
import Event from '#models/event'
import User from '#models/user'

export default class RegisterParticipantUseCase {
  private repository: RegistrationsRepository

  constructor() {
    this.repository = new RegistrationsRepository()
  }

  async execute(user: User, eventId: number) {
    if (user.role !== 'PARTICIPANT') {
      throw new Error('Only participants can register')
    }

    const event = await Event.find(eventId)
    if (!event) {
      throw new Error('Event not found')
    }

    const isRegistered = await this.repository.isUserRegistered(user.id, eventId)
    if (isRegistered) {
      throw new Error('User already registered for this event')
    }

    const currentParticipants = await this.repository.countParticipants(eventId)
    if (currentParticipants >= event.maxCapacity) {
      throw new Error('Event is full')
    }

    const eventDateSQL = event.eventDate.toSQL()
    if (!eventDateSQL) {
      throw new Error('Invalid event date')
    }
    const hasConflict = await this.repository.hasTimeConflict(user.id, eventDateSQL)

    if (hasConflict) {
      throw new Error('Time conflict with another event')
    }

    return await this.repository.create(user.id, eventId)
  }
}
