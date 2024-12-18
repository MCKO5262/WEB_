import express from 'express';
import db from './db.mjs';

const app = express();
const port = 3000;

app.use(express.json());

// Endpoint to get all users
app.get('/users', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

// Endpoint to get all artists
app.get('/artists', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM artists');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

// Other routes can be added here for orders, events, etc.

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
