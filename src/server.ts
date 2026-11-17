import 'reflect-metadata'
import 'dotenv/config'
import { app } from './app'
import { AppDataSource } from './config/data-source'

const PORT = Number(process.env.PORT) || 3000

AppDataSource.initialize()
    .then(() => {
        console.log('✅ Connexion à la base de données réussie')
        app.listen(PORT, () => {
            console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`)
        })
    })
    .catch((error) => {
        console.error('❌ Impossible de se connecter à la base de données :', error)
        process.exit(1)
    })