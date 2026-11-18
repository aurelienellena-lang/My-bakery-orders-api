import { z } from 'zod'
import { User } from '../entities/user.entity'

// ----- Entrées (ce que le client envoie) -----

// POST /auth/register
export const RegisterDto = z.object({
    email: z.email('Email invalide').toLowerCase(),
    firstName: z.string().trim().min(1, 'Le prénom est obligatoire').max(100),
    lastName: z.string().trim().min(1, 'Le nom est obligatoire').max(100),
    password: z.string().min(8, 'Le mot de passe doit faire au moins 8 caractères').max(72),
})

// POST /auth/login
export const LoginDto = z.object({
    email: z.email('Email invalide').toLowerCase(),
    password: z.string().min(1, 'Le mot de passe est obligatoire'),
})

// POST /auth/refresh
export const RefreshDto = z.object({
    refreshToken: z.string().min(1, 'Le refresh token est obligatoire'),
})

export type RegisterDto = z.infer<typeof RegisterDto>
export type LoginDto = z.infer<typeof LoginDto>
export type RefreshDto = z.infer<typeof RefreshDto>

// ----- Sortie (ce que l'API renvoie) -----

export const toUserResponse = (user: User) => ({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
})