import jwt, { SignOptions } from 'jsonwebtoken'
import { createHash, randomUUID } from 'node:crypto'
import { UserRole } from '../entities/user.entity'
import { UnauthorizedError } from '../errors/app-error'

export type TokenPayload = {
    userId: number
    role: UserRole
}

const sign = (payload: TokenPayload, secret: string, expiresIn: string) =>
    jwt.sign(payload, secret, {
        expiresIn: expiresIn as SignOptions['expiresIn'],
        jwtid: randomUUID(), // identifiant unique : deux tokens ne sont jamais identiques
    })

const verify = (token: string, secret: string): TokenPayload => {
    try {
        const { userId, role } = jwt.verify(token, secret) as TokenPayload
        return { userId, role }
    } catch {
        throw new UnauthorizedError('Token invalide ou expiré')
    }
}

export const signAccessToken = (payload: TokenPayload) =>
    sign(payload, process.env.JWT_ACCESS_SECRET!, process.env.JWT_ACCESS_EXPIRES_IN!)

export const signRefreshToken = (payload: TokenPayload) =>
    sign(payload, process.env.JWT_REFRESH_SECRET!, process.env.JWT_REFRESH_EXPIRES_IN!)

export const verifyAccessToken = (token: string) =>
    verify(token, process.env.JWT_ACCESS_SECRET!)

export const verifyRefreshToken = (token: string) =>
    verify(token, process.env.JWT_REFRESH_SECRET!)

// Hash rapide (SHA-256) pour stocker le refresh token en base
export const hashToken = (token: string) =>
    createHash('sha256').update(token).digest('hex')