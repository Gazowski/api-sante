import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
    process.env.POSTGRES_DB || 'sante',
    process.env.POSTGRES_USER || 'postgres',
    process.env.POSTGRES_PASSWORD || 'postgres123',
    {
        host: process.env.POSTGRES_HOST || 'localhost',
        port: Number(process.env.POSTGRES_PORT) || 5432,
        dialect: 'postgres',
        logging: process.env.NODE_ENV === 'development',
    }
);

export async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync(); // Synchronise les modèles avec la base de données (à utiliser avec précaution en production)
        console.log('Database synced.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}