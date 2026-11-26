import { DeepPartial } from 'typeorm'
import { AppDataSource } from '../config/data-source'
import { Product } from '../entities/product.entity'
import { RecipeItem } from '../entities/recipe-item.entity'

const repo = () => AppDataSource.getRepository(Product)
const recipeRepo = () => AppDataSource.getRepository(RecipeItem)

export const productRepository = {
    // On charge la recette avec le produit
    findAll: () => repo().find({ relations: { recipeItems: true }, order: { name: 'ASC' } }),

    findById: (id: number) =>
        repo().findOne({ where: { id }, relations: { recipeItems: true } }),

    findByName: (name: string) => repo().findOneBy({ name }),

    // Crée OU met à jour (si data contient un id), recette comprise grâce à cascade
    save: (data: DeepPartial<Product>) => repo().save(repo().create(data)),

    // Supprime toutes les lignes de recette d'un produit (avant de la remplacer)
    deleteRecipe: (productId: number) => recipeRepo().delete({ product: { id: productId } }),

    remove: (product: Product) => repo().remove(product),
}