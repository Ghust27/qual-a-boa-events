import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import CreateEventUseCase from '#use_cases/create_event_use_case'
import { createEventValidator, updateEventValidator } from '#validators/events'
import GetEventParticipantsUseCase from '#use_cases/get_event_participants_use_case'
import UpdateEventUseCase from '#use_cases/update_event_use_case'
import DeleteEventUseCase from '#use_cases/delete_event_use_case'

export default class EventsController {
  async store({ request, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(createEventValidator)
    const useCase = new CreateEventUseCase()
    const event = await useCase.execute(
      {
        ...payload,
        eventDate: DateTime.fromJSDate(payload.eventDate),
      },
      user
    )

    return response.created(event)
  }

  async participants({ request, response, auth, params }: HttpContext) {
    const user = auth.getUserOrFail()
    const eventId = params.id
    const useCase = new GetEventParticipantsUseCase()
    const participants = await useCase.execute(Number(eventId), user)

    return response.ok(participants)
  }

  async update({ request, response, auth, params }: HttpContext) {
    const user = auth.getUserOrFail()
    const eventId = params.id
    const payload = await request.validateUsing(updateEventValidator)
    const useCase = new UpdateEventUseCase()
    const event = await useCase.execute(
      Number(eventId),
      {
        ...payload,
        eventDate: payload.eventDate ? DateTime.fromJSDate(payload.eventDate) : undefined,
      },
      user
    )

    return response.ok(event)
  }

  async destroy({ response, auth, params }: HttpContext) {
    const user = auth.getUserOrFail()
    const eventId = params.id
    const useCase = new DeleteEventUseCase()
    await useCase.execute(Number(eventId), user)

    return response.noContent()
  }
}
