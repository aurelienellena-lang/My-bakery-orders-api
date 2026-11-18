export class AppError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message)
        this.name = this.constructor.name
    }
}

export class NotFoundError extends AppError {
    constructor(message = 'Ressource introuvable') {
        super(404, message)
    }
}

export class ConflictError extends AppError {
    constructor(message: string) {
        super(409, message)
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = 'Authentification requise') {
        super(401, message)
    }
}

export class ForbiddenError extends AppError {
    constructor(message = 'Accès interdit') {
        super(403, message)
    }
}