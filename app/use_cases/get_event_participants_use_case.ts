import EventsRepository from '#repositories/events_repository'
import User from '#models/user'

export default class GetEventParticipantsUseCase {
  private eventsRepository: EventsRepository

  constructor() {
    this.eventsRepository = new EventsRepository()
  }

  async execute(eventId: number, user: User) {
    const event = await this.eventsRepository.findWithParticipants(eventId)

    if (!event) {
      throw new Error('Event not found')
    }

    if (event.organizerId !== user.id) {
      throw new Error('Unauthorized: You are not the owner of this event')
    }

    return event.registrations.map((reg) => reg.user)
  }
}
