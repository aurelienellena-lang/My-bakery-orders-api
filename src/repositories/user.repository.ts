import { AppDataSource } from '../config/data-source'
import { User, UserRole } from '../entities/user.entity'

const repo = () => AppDataSource.getRepository(User)

export const userRepository = {
    findById: (id: number) => repo().findOneBy({ id }),

    findByEmail: (email: string) => repo().findOneBy({ email }),

    create: (data: {
        email: string
        firstName: string
        lastName: string
        passwordHash: string
        role?: UserRole
    }) => repo().save(repo().create(data)),

    updateRefreshTokenHash: (id: number, refreshTokenHash: string | null) =>
        repo().update({ id }, { refreshTokenHash }),
}