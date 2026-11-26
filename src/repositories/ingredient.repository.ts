import { AppDataSource } from '../config/data-source'
import { Ingredient } from '../entities/ingredient.entity'
import { CreateIngredientDto, UpdateIngredientDto } from '../dtos/ingredient.dto'
import { In } from 'typeorm'

const repo = () => AppDataSource.getRepository(Ingredient)

export const ingredientRepository = {
    findAll: () => repo().find({ order: { name: 'ASC' } }),

    findById: (id: number) => repo().findOneBy({ id }),

    findByName: (name: string) => repo().findOneBy({ name }),
    findByIds: (ids: number[]) => repo().findBy({ id: In(ids) }),

    create: (data: CreateIngredientDto) => repo().save(repo().create(data)),

    update: (ingredient: Ingredient, data: UpdateIngredientDto) =>
        repo().save(repo().merge(ingredient, data)),

    remove: (ingredient: Ingredient) => repo().remove(ingredient),
}