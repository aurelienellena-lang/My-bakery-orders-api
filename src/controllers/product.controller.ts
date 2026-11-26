import { Request, Response } from 'express'
import * as productService from '../services/product.service'
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto'
import { IdParamDto } from '../dtos/ingredient.dto'

export const getAll = async (req: Request, res: Response) => {
    res.json(await productService.getAllProducts())
}

export const getById = async (req: Request, res: Response) => {
    const { id } = IdParamDto.parse(req.params)
    res.json(await productService.getProductById(id))
}

export const create = async (req: Request, res: Response) => {
    const data = CreateProductDto.parse(req.body)
    res.status(201).json(await productService.createProduct(data))
}

export const update = async (req: Request, res: Response) => {
    const { id } = IdParamDto.parse(req.params)
    const data = UpdateProductDto.parse(req.body)
    res.json(await productService.updateProduct(id, data))
}

export const remove = async (req: Request, res: Response) => {
    const { id } = IdParamDto.parse(req.params)
    await productService.deleteProduct(id)
    res.status(204).send()
}