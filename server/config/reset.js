import { pool } from './database.js'

const createCarsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS cars;

        CREATE TABLE IF NOT EXISTS cars (
            id SERIAL PRIMARY KEY,
            make VARCHAR(255) NOT NULL,
            model VARCHAR(255) NOT NULL,
            year INTEGER NOT NULL,
            color VARCHAR(255) NOT NULL,
            price INTEGER NOT NULL,
            image_url TEXT
        );
    `

    try {
        await pool.query(createTableQuery)
        console.log('🎉 cars table created successfully')
    } catch (err) {
        console.error('⚠️ error creating cars table', err)
    }
}

createCarsTable()
