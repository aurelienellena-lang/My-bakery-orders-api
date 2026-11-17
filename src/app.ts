import express from 'express'
import cors from 'cors'

export const app = express()

app.use(cors())
app.use(express.json())

// Route de santé : vérifier que l'API répond
app.get('/health', (req, res) => {
    res.json({ status: 'ok' })
})

// Les routes /ingredients, /products... viendront ici