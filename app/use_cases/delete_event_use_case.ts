import EventsRepository from '#repositories/events_repository'
import RegistrationsRepository from '#repositories/registrations_repository'
import User from '#models/user'

export default class DeleteEventUseCase {
  private eventsRepository: EventsRepository
  private registrationsRepository: RegistrationsRepository

  constructor() {
    this.eventsRepository = new EventsRepository()
    this.registrationsRepository = new RegistrationsRepository()
  }

  async execute(eventId: number, user: User) {
    const event = await this.eventsRepository.findById(eventId)

    if (!event) {
      throw new Error('Event not found')
    }

    if (event.organizerId !== user.id) {
      throw new Error('Unauthorized: You can only delete your own events')
    }

    const totalParticipants = await this.registrationsRepository.countParticipants(eventId)
    if (totalParticipants > 0) {
      throw new Error('Cannot delete event with registered participants')
    }

    await this.eventsRepository.delete(event)
  }
}
