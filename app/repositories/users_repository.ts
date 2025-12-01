import User from '#models/user'
import type { CreateUserDto } from '#dtos/create_user_dto'

export default class UsersRepository {
  async create(payload: CreateUserDto): Promise<User> {
    const user = await User.create(payload)
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await User.findBy('email', email)
    return user
  }
}
