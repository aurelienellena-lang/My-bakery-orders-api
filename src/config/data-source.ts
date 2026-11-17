import 'reflect-metadata'
import 'dotenv/config'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    entities: [__dirname + '/../entities/*.entity.{ts,js}'],

    synchronize: true, // ⚠️ crée/modifie les tables automatiquement — développement uniquement
    logging: false,    // passez à true pour voir le SQL généré dans le terminal
})