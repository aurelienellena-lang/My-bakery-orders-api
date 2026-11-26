import { productRepository } from '../repositories/product.repository'
import { ingredientRepository } from '../repositories/ingredient.repository'
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto'
import { AppError, NotFoundError, ConflictError } from '../errors/app-error'

type RecipeLine = CreateProductDto['recipe'][number]

// Règles métier sur la recette : pas de doublon, ingrédients existants
const checkRecipe = async (recipe: RecipeLine[]) => {
    const ids = recipe.map((line) => line.ingredientId)

    if (new Set(ids).size !== ids.length) {
        throw new AppError(400, 'Un ingrédient apparaît plusieurs fois dans la recette')
    }

    const found = await ingredientRepository.findByIds(ids)
    if (found.length !== ids.length) {
        const foundIds = found.map((ingredient) => ingredient.id)
        const missing = ids.filter((id) => !foundIds.includes(id))
        throw new NotFoundError(`Ingrédient(s) introuvable(s) : ${missing.join(', ')}`)
    }
}

// Format client { ingredientId, quantity } → format TypeORM { ingredient: { id }, quantity }
const toRecipeItems = (recipe: RecipeLine[]) =>
    recipe.map((line) => ({ ingredient: { id: line.ingredientId }, quantity: line.quantity }))

export const getAllProducts = () => productRepository.findAll()

export const getProductById = async (id: number) => {
    const product = await productRepository.findById(id)
    if (!product) {
        throw new NotFoundError(`Produit ${id} introuvable`)
    }
    return product
}

export const createProduct = async (data: CreateProductDto) => {
    if (await productRepository.findByName(data.name)) {
        throw new ConflictError(`Le produit "${data.name}" existe déjà`)
    }
    await checkRecipe(data.recipe)

    const { recipe, ...fields } = data
    const saved = await productRepository.save({ ...fields, recipeItems: toRecipeItems(recipe) })
    return getProductById(saved.id)
}

export const updateProduct = async (id: number, data: UpdateProductDto) => {
    const product = await getProductById(id)

    if (data.name && data.name !== product.name && (await productRepository.findByName(data.name))) {
        throw new ConflictError(`Le produit "${data.name}" existe déjà`)
    }

    const { recipe, ...fields } = data
    if (recipe) {
        await checkRecipe(recipe)
        await productRepository.deleteRecipe(id) // l'ancienne recette est remplacée
    }

    await productRepository.save({
        id,
        ...fields,
        ...(recipe && { recipeItems: toRecipeItems(recipe) }),
    })
    return getProductById(id)
}

export const deleteProduct = async (id: number) => {
    const product = await getProductById(id)
    await productRepository.remove(product)
}