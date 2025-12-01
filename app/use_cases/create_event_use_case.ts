import EventsRepository from '#repositories/events_repository'
import { CreateEventDTO } from '#dtos/create_event_dto'
import User from '#models/user'

export default class CreateEventUseCase {
  private eventsRepository: EventsRepository

  constructor() {
    this.eventsRepository = new EventsRepository()
  }

  async execute(payload: Omit<CreateEventDTO, 'organizerId'>, user: User) {
    if (user.role !== 'ORGANIZER') {
      throw new Error('Only organizers can create events')
    }

    const eventData: CreateEventDTO = {
      ...payload,
      organizerId: user.id,
    }

    return await this.eventsRepository.create(eventData)
  }
}
