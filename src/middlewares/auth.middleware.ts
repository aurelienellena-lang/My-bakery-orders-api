import { RequestHandler } from 'express'
import { verifyAccessToken, TokenPayload } from '../utils/jwt'
import { UserRole } from '../entities/user.entity'
import { UnauthorizedError, ForbiddenError } from '../errors/app-error'

// On ajoute "user" au type Request d'Express
declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload
        }
    }
}

// Vérifie le token → sait QUI fait la requête
export const authenticate: RequestHandler = (req, res, next) => {
    const header = req.headers.authorization

    if (!header || !header.startsWith('Bearer ')) {
        throw new UnauthorizedError('Token manquant')
    }

    const token = header.slice(7) // enlève "Bearer "
    req.user = verifyAccessToken(token)
    next()
}

// Vérifie le rôle → sait si la personne a le DROIT
export const authorize = (...roles: UserRole[]): RequestHandler => (req, res, next) => {
    if (!req.user) {
        throw new UnauthorizedError()
    }
    if (!roles.includes(req.user.role)) {
        throw new ForbiddenError('Vous n\'avez pas les droits pour cette action')
    }
    next()
}
