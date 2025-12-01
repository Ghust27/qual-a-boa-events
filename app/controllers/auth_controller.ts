import type { HttpContext } from '@adonisjs/core/http'
import RegisterUserUseCase from '#use_cases/register_user_use_case'
import { loginUserValidator, registerUserValidator } from '#validators/auth'
import { CreateUserDto } from '#dtos/create_user_dto'
import LoginUserUseCase from '#use_cases/login_user_use_case'
import { updateUserValidator } from '#validators/auth'
import UpdateUserUseCase from '#use_cases/update_user_use_case'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerUserValidator)
    const userDto: CreateUserDto = {
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password,
      cpf: payload.cpf,
      role: payload.role as 'ORGANIZER' | 'PARTICIPANT',
    }

    const registerUserUseCase = new RegisterUserUseCase()
    const user = await registerUserUseCase.execute(userDto)

    return response.created(user)
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginUserValidator)

    const loginUseCase = new LoginUserUseCase()
    const result = await loginUseCase.execute({ email, password })
    return response.ok(result)
  }

  async update({ request, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(updateUserValidator)

    const useCase = new UpdateUserUseCase()
    const updatedUser = await useCase.execute(user, payload)

    return response.ok(updatedUser)
  }
}
