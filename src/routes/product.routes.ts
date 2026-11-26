import { Router } from 'express'
import * as productController from '../controllers/product.controller'
import { authenticate, authorize } from '../middlewares/auth.middleware'
import { UserRole } from '../entities/user.entity'
  
const router = Router()


// Lecture : publique (pas besoin d'être connecté).
router.get('/', productController.getAll)
router.get('/:id', productController.getById)

// Écriture : admin uniquement
router.post('/', authenticate, authorize(UserRole.ADMIN), productController.create)
router.patch('/:id', authenticate, authorize(UserRole.ADMIN), productController.update)
router.delete('/:id', authenticate, authorize(UserRole.ADMIN), productController.remove)

export default router