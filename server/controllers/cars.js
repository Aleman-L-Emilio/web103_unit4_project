import { pool } from '../config/database.js'

const getCars = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM cars ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

const getCarById = async (req, res) => {
    try {
        const selectQuery = `
            SELECT make, model, year, color, price, image_url FROM cars WHERE id = $1
        `
        const id = parseInt(req.params.id)
        const results = await pool.query(selectQuery, [id])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

const createCar = async (req, res) => {
    const { make, model, year, color, price, image_url } = req.body
    try {
        const results = await pool.query(`
            INSERT INTO cars (make, model, year, color, price, image_url)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [make, model, year, color, price, image_url]
        )
        res.status(201).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

const updateCar = async (req, res) => {
    const { make, model, year, color, price, image_url } = req.body
    const id = parseInt(req.params.id)

    try {
        await pool.query(
            'UPDATE cars SET make = $1, model = $2, year = $3, color = $4, price = $5, image_url = $6 WHERE id = $7',
            [make, model, year, color, price, image_url, id]
        )
        res.status(200).json({ message: 'Car updated successfully' })
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

const deleteCar = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const results = await pool.query('DELETE FROM cars WHERE id = $1', [id])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

export default {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
}
