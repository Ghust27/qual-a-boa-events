import Event from '#models/event'
import { CreateEventDTO } from '#dtos/create_event_dto'

export default class EventsRepository {
  async create(payload: CreateEventDTO): Promise<Event> {
    return await Event.create(payload)
  }

  async findById(id: number): Promise<Event | null> {
    return await Event.find(id)
  }

  async findWithParticipants(eventId: number): Promise<Event | null> {
    return await Event.query()
      .where('id', eventId)
      .preload('registrations', (query) => {
        query.preload('user')
      })
      .first()
  }

  async update(event: Event, data: any): Promise<Event> {
    event.merge(data)
    return await event.save()
  }

  async delete(event: Event): Promise<void> {
    await event.delete()
  }
}
