import { ErrorRequestHandler, RequestHandler } from 'express'
import { ZodError } from 'zod'
import { AppError } from '../errors/app-error'

// Route inexistante → 404
export const notFoundHandler: RequestHandler = (req, res) => {
    res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} introuvable` })
}

// Toutes les erreurs de l'application arrivent ici
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // 1. Données refusées par zod → 400
    if (err instanceof ZodError) {
        res.status(400).json({
            error: 'Données invalides',
            details: err.issues.map((issue) => ({
                field: issue.path.join('.'),
                message: issue.message,
            })),
        })
        return
    }

    // 2. JSON mal écrit dans le body (virgule en trop...) → 400
    if (err instanceof SyntaxError && 'body' in err) {
        res.status(400).json({ error: 'JSON invalide dans le corps de la requête' })
        return
    }

    // 3. Nos erreurs métier (NotFound, Conflict...) → leur propre code
    if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message })
        return
    }

    // 4. Tout le reste = bug imprévu → 500, détails seulement dans le terminal
    console.error(err)
    res.status(500).json({ error: 'Erreur interne du serveur' })
}