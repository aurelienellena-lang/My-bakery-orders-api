import { Router } from 'express'
import * as ingredientController from '../controllers/ingredient.controller'
import { authenticate, authorize } from '../middlewares/auth.middleware'
import { UserRole } from '../entities/user.entity'

const router = Router()

// Toutes les routes ci-dessous exigent d'être connecté
router.use(authenticate)

// Lecture : tout utilisateur connecté
router.get('/', ingredientController.getAll)
router.get('/:id', ingredientController.getById)

// Écriture : admin uniquement
router.post('/', authorize(UserRole.ADMIN), ingredientController.create)
router.patch('/:id', authorize(UserRole.ADMIN), ingredientController.update)
router.delete('/:id', authorize(UserRole.ADMIN), ingredientController.remove)

export default router

