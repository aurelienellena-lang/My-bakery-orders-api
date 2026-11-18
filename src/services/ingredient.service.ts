import { ingredientRepository } from '../repositories/ingredient.repository'
import { CreateIngredientDto, UpdateIngredientDto } from '../dtos/ingredient.dto'
import { NotFoundError, ConflictError } from '../errors/app-error'

export const getAllIngredients = () => ingredientRepository.findAll()

export const getIngredientById = async (id: number) => {
    const ingredient = await ingredientRepository.findById(id)
    if (!ingredient) {
        throw new NotFoundError(`Ingrédient ${id} introuvable`)
    }
    return ingredient
}

export const createIngredient = async (data: CreateIngredientDto) => {
    const existing = await ingredientRepository.findByName(data.name)
    if (existing) {
        throw new ConflictError(`L'ingrédient "${data.name}" existe déjà`)
    }
    return ingredientRepository.create(data)
}

export const updateIngredient = async (id: number, data: UpdateIngredientDto) => {
    const ingredient = await getIngredientById(id)

    if (data.name && data.name !== ingredient.name) {
        const existing = await ingredientRepository.findByName(data.name)
        if (existing) {
            throw new ConflictError(`L'ingrédient "${data.name}" existe déjà`)
        }
    }

    return ingredientRepository.update(ingredient, data)
}

export const deleteIngredient = async (id: number) => {
    const ingredient = await getIngredientById(id)
    await ingredientRepository.remove(ingredient)
}