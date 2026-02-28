const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error opening database ', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Initialize table
        db.run(`CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL,
            image TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating table ', err.message);
            } else {
                // Seed data if empty
                db.get(`SELECT COUNT(*) AS count FROM products`, (err, row) => {
                    if (err) {
                        console.error('Error checking products count ', err.message);
                    } else if (row.count === 0) {
                        console.log('Seeding initial products data...');
                        const insert = 'INSERT INTO products (name, description, price, image) VALUES (?,?,?,?)';
                        db.run(insert, ["Golden Cavendish", "The world's most popular banana, perfectly sweet and creamy.", 50.0, "public/images/cavendish.png"]);
                        db.run(insert, ["Exotic Red Dacca", "Rare deep red skin with a hint of raspberry sweetness.", 50.0, "public/images/red.png"]);
                        db.run(insert, ["Baby Lady Finger", "Tiny, exceptionally sweet, and perfect for snacking.", 50.0, "public/images/baby.png"]);
                        db.run(insert, ["Blue Java (Ice Cream)", "Silky texture with a flavour reminiscent of vanilla custard.", 50.0, "public/images/hero.png"]);
                    }
                });
            }
        });
    }
});

// GET /api/products
app.get('/api/products', (req, res) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
