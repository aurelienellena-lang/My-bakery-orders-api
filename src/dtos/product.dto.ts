import { z } from 'zod'

// Une ligne de recette envoyée par le client
const RecipeLineDto = z.object({
    ingredientId: z.number().int().positive(),
    quantity: z.number().int().positive(),
})

const ProductFields = z.object({
    name: z.string().trim().min(1, 'Le nom est obligatoire').max(100),
    description: z.string().trim().max(1000).nullable(),
    priceCents: z.number().int().positive(),
    isAvailable: z.boolean(),
    recipe: z.array(RecipeLineDto).min(1, 'La recette doit contenir au moins un ingrédient'),
})

// POST /products
export const CreateProductDto = ProductFields.extend({
    description: ProductFields.shape.description.default(null),
    isAvailable: ProductFields.shape.isAvailable.default(true),
})

// PATCH /products/:id (si "recipe" est envoyée, elle REMPLACE l'ancienne)
export const UpdateProductDto = ProductFields.partial().refine(
    (data) => Object.keys(data).length > 0,
    { message: 'Envoyez au moins un champ à modifier' }
)

export type CreateProductDto = z.infer<typeof CreateProductDto>
export type UpdateProductDto = z.infer<typeof UpdateProductDto>