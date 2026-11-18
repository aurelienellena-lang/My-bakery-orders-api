import bcrypt from 'bcryptjs'
import { userRepository } from '../repositories/user.repository'
import { RegisterDto, LoginDto, toUserResponse } from '../dtos/auth.dto'
import { User } from '../entities/user.entity'
import { ConflictError, UnauthorizedError } from '../errors/app-error'
import {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
    hashToken,
} from '../utils/jwt'

// Crée un access + refresh token et enregistre le hash du refresh
const issueTokens = async (user: User) => {
    const payload = { userId: user.id, role: user.role }
    const accessToken = signAccessToken(payload)
    const refreshToken = signRefreshToken(payload)

    await userRepository.updateRefreshTokenHash(user.id, hashToken(refreshToken))

    return { accessToken, refreshToken, user: toUserResponse(user) }
}

export const register = async (data: RegisterDto) => {
    const existing = await userRepository.findByEmail(data.email)
    if (existing) {
        throw new ConflictError('Un compte existe déjà avec cet email')
    }

    const passwordHash = await bcrypt.hash(data.password, 10)
    const user = await userRepository.create({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        passwordHash,
    })

    return toUserResponse(user)
}

export const login = async (data: LoginDto) => {
    const user = await userRepository.findByEmail(data.email)
    const passwordOk = user && (await bcrypt.compare(data.password, user.passwordHash))

    if (!user || !passwordOk) {
        throw new UnauthorizedError('Email ou mot de passe incorrect')
    }

    return issueTokens(user)
}

export const refresh = async (refreshToken: string) => {
    const { userId } = verifyRefreshToken(refreshToken)
    const user = await userRepository.findById(userId)

    if (!user || user.refreshTokenHash !== hashToken(refreshToken)) {
        // Token déjà utilisé ou révoqué : on coupe la session par sécurité
        if (user) await userRepository.updateRefreshTokenHash(user.id, null)
        throw new UnauthorizedError('Refresh token invalide')
    }

    return issueTokens(user)
}

export const logout = async (userId: number) => {
    await userRepository.updateRefreshTokenHash(userId, null)
}