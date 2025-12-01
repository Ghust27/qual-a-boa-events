import UsersRepository from '#repositories/users_repository'
import { CreateUserDto } from '#dtos/create_user_dto'
import User from '#models/user'

export default class RegisterUserUseCase {
  private usersRepository: UsersRepository

  constructor() {
    this.usersRepository = new UsersRepository()
  }

  async execute(data: CreateUserDto): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(data.email)

    if (userExists) {
      throw new Error('User already exists')
    }

    return await this.usersRepository.create(data)
  }
}
