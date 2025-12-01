import EventsRepository from '#repositories/events_repository'
import { CreateEventDTO } from '#dtos/create_event_dto'
import User from '#models/user'

export default class UpdateEventUseCase {
  private eventsRepository: EventsRepository

  constructor() {
    this.eventsRepository = new EventsRepository()
  }

  async execute(eventId: number, payload: Partial<CreateEventDTO>, user: User) {
    const event = await this.eventsRepository.findById(eventId)

    if (!event) {
      throw new Error('Event not found')
    }

    if (event.organizerId !== user.id) {
      throw new Error('Unauthorized: You can only edit your own events')
    }

    return await this.eventsRepository.update(event, payload)
  }
}
