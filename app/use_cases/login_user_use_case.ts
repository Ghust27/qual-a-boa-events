import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class LoginUserUseCase {
  async execute({ email, password }: any) {
    const user = await User.findBy('email', email)
    if (!user) {
      throw new Error('Invalid credentials')
    }

    const isPasswordValid = await hash.verify(user.password, password)
    if (!isPasswordValid) {
      throw new Error('Invalid credentials')
    }

    const token = await User.accessTokens.create(user)

    return {
      token: token,
      user: {
        id: user.id,
        fullname: user.fullName,
        email: user.email,
        role: user.role,
      },
    }
  }
}
