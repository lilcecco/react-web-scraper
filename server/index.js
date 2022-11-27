const express = require('express');
const cookeiParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');
const mysql = require('mysql');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const db = mysql.createConnection({
    // socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock', // to solve ETIMEOUT error
    host: process.env.HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

app.use(express.static(path.join(__dirname, '../client/build')));

app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    if (req.originalUrl === '/api/checkout/webhook') {
        next();
    } else {
        express.json()(req, res, next);
    }
});

app.use(cookeiParser());

db.connect((err) => {
    if (err) throw err; // da cambiare
    console.log("Connected...");
});

app.use('/api/data', require('./routes/data'));
app.use('/api/scraper', require('./routes/scraper'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/checkout', require('./routes/checkout'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});