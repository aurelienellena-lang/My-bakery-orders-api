import express from 'express'
import cors from 'cors'
import ingredientRoutes from './routes/ingredient.routes'
import { notFoundHandler, errorHandler } from './middlewares/error-handler'

export const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
    res.json({ status: 'ok' })
})

app.use('/ingredients', ingredientRoutes)

// ⚠️ Toujours en DERNIER, dans cet ordre
app.use(notFoundHandler)
app.use(errorHandler)

// Les routes /ingredients, /products... viendront ici