import { Router } from 'express'
import * as ingredientController from '../controllers/ingredient.controller'

const router = Router()

router.get('/', ingredientController.getAll)
router.get('/:id', ingredientController.getById)
router.post('/', ingredientController.create)
router.patch('/:id', ingredientController.update)
router.delete('/:id', ingredientController.remove)

export default router