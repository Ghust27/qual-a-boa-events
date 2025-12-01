import User from '#models/user'

export interface UpdateUserDTO {
  fullName?: string
  password?: string
  cpf?: string
}

export default class UpdateUserUseCase {
  async execute(user: User, data: UpdateUserDTO) {
    user.merge(data)
    await user.save()

    return user
  }
}
