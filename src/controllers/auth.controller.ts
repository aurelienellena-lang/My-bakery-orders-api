import { Request, Response } from 'express'
import * as authService from '../services/auth.service'
import { RegisterDto, LoginDto, RefreshDto } from '../dtos/auth.dto'

export const register = async (req: Request, res: Response) => {
    const data = RegisterDto.parse(req.body)
    const user = await authService.register(data)
    res.status(201).json(user)
}

export const login = async (req: Request, res: Response) => {
    const data = LoginDto.parse(req.body)
    const result = await authService.login(data)
    res.json(result)
}

export const refresh = async (req: Request, res: Response) => {
    const { refreshToken } = RefreshDto.parse(req.body)
    const result = await authService.refresh(refreshToken)
    res.json(result)
}