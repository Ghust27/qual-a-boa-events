import type { HttpContext } from '@adonisjs/core/http'
import RegisterParticipantUseCase from '#use_cases/register_participant_use_case'
import GetMyRegistrationsUseCase from '#use_cases/get_my_registrations_use_case'
import CancelRegistrationUseCase from '#use_cases/cancel_registration_use_case'

export default class RegistrationsController {
  async store({ request, response, auth, params }: HttpContext) {
    const user = auth.getUserOrFail()
    const eventId = params.id
    const useCase = new RegisterParticipantUseCase()
    const registration = await useCase.execute(user, Number(eventId))
    return response.created(registration)
  }

  async index({ response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const useCase = new GetMyRegistrationsUseCase()
    const myEvents = await useCase.execute(user)
    return response.ok(myEvents)
  }

  async destroy({ response, auth, params }: HttpContext) {
    const user = auth.getUserOrFail()
    const eventId = params.id

    const useCase = new CancelRegistrationUseCase()
    await useCase.execute(Number(eventId), user)

    return response.noContent()
  }
}
