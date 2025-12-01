export interface CreateUserDto {
    fullName: string
    email: string
    password: string
    cpf?: string
    role: 'ORGANIZER' | 'PARTICIPANT'
}