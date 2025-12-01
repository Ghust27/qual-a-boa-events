import RegistrationsRepository from '#repositories/registrations_repository'
import User from '#models/user'
import Registration from '#models/registration'

export default class CancelRegistrationUseCase {
  async execute(eventId: number, user: User) {
    const registration = await Registration.query()
      .where('user_id', user.id)
      .andWhere('event_id', eventId)
      .first()

    if (!registration) {
      throw new Error('Registration not found')
    }

    await registration.delete()
  }
}
