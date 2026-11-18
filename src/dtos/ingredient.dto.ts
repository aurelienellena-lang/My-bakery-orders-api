import { z } from 'zod'
import { IngredientUnit } from '../entities/ingredient.entity'

// Les champs d'un ingrédient, SANS valeurs par défaut
const IngredientFields = z.object({
    name: z.string().trim().min(1, 'Le nom est obligatoire').max(100),
    unit: z.enum(IngredientUnit),
    stockQuantity: z.number().int().min(0),
    alertThreshold: z.number().int().min(0),
})

// POST /ingredients : on ajoute les valeurs par défaut (0) ici seulement
export const CreateIngredientDto = IngredientFields.extend({
    stockQuantity: IngredientFields.shape.stockQuantity.default(0),
    alertThreshold: IngredientFields.shape.alertThreshold.default(0),
})

// PATCH /ingredients/:id : tout est optionnel, mais au moins un champ
// (partir de IngredientFields, sinon les .default(0) écraseraient les valeurs existantes)
export const UpdateIngredientDto = IngredientFields.partial().refine(
    (data) => Object.keys(data).length > 0,
    { message: 'Envoyez au moins un champ à modifier' }
)

// Paramètre :id de l'URL ("3" → 3)
export const IdParamDto = z.object({
    id: z.coerce.number().int().positive(),
})

export type CreateIngredientDto = z.infer<typeof CreateIngredientDto>
export type UpdateIngredientDto = z.infer<typeof UpdateIngredientDto>