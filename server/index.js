const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mysql = require('mysql');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

app.use(express.static(path.join(__dirname, '../client/build')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.connect((err) => {
    if (err) throw err; // da cambiare
    console.log("Connected...");
});

app.use('/api/data', require('./routes/data'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});