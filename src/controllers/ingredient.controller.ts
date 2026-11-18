import { Request, Response } from 'express'
import * as ingredientService from '../services/ingredient.service'
import { CreateIngredientDto, UpdateIngredientDto, IdParamDto } from '../dtos/ingredient.dto'

export const getAll = async (req: Request, res: Response) => {
    const ingredients = await ingredientService.getAllIngredients()
    res.json(ingredients)
}

export const getById = async (req: Request, res: Response) => {
    const { id } = IdParamDto.parse(req.params)
    const ingredient = await ingredientService.getIngredientById(id)
    res.json(ingredient)
}

export const create = async (req: Request, res: Response) => {
    const data = CreateIngredientDto.parse(req.body)
    const ingredient = await ingredientService.createIngredient(data)
    res.status(201).json(ingredient)
}

export const update = async (req: Request, res: Response) => {
    const { id } = IdParamDto.parse(req.params)
    const data = UpdateIngredientDto.parse(req.body)
    const ingredient = await ingredientService.updateIngredient(id, data)
    res.json(ingredient)
}

export const remove = async (req: Request, res: Response) => {
    const { id } = IdParamDto.parse(req.params)
    await ingredientService.deleteIngredient(id)
    res.status(204).send()
}