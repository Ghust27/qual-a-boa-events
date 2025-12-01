import RegistrationsRepository from '#repositories/registrations_repository'
import User from '#models/user'

export default class GetMyRegistrationsUseCase {
  private registrationsRepository: RegistrationsRepository

  constructor() {
    this.registrationsRepository = new RegistrationsRepository()
  }

  async execute(user: User) {
    const registrations = await this.registrationsRepository.getUserRegistrations(user.id)

    return registrations.map((reg) => ({
      inscriptionId: reg.id,
      inscriptionDate: reg.createdAt,
      event: reg.event,
    }))
  }
}
