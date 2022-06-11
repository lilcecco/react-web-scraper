const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.getProcesses = (req, res) => {
    db.query('SELECT * FROM processes', (err, results) => {
        if (err) throw err; // da cambiare
        
        const parsedResults = results.map(result => {return { ...result, urls: JSON.parse(result.urls), results: JSON.parse(result.results) }});
        res.json(parsedResults);
    });
}

exports.getBlacklist = (req, res) => {
    db.query('SELECT * FROM blacklist', (err, results) => {
        if (err) throw err; // da cambiare

        res.json(results);
    });
}

exports.getProducts = (req, res) => {
    db.query('SELECT * FROM products ORDER BY price ASC', (err, results) => {
        if (err) throw err; // da cambiare

        const parsedResults = results.map(result => {return { ...result, description: JSON.parse(result.description) }});
        res.json(parsedResults);
    });
}

exports.getUser = (req, res) => {
    const { id } = req.user;

    const sql = '\
    SELECT users.email, users.customer_id, users.status, products.prod_name\
    FROM users\
    LEFT JOIN products ON users.price_id = products.price_id\
    WHERE id = ?'

    db.query(sql, [id], async (err, results) => {
        if (err) throw err; // da cambiare

        res.json(results[0]);
    });
}

exports.setProcess = (req, res) => {
    const process = req.body;
    const parsedProcess = { ...process, urls: JSON.stringify(process.urls), results: JSON.stringify(process.results) };

    db.query('INSERT INTO processes SET ?', parsedProcess, (err, results) => {
        if (err) {
            res.json({ error: 'Adding new process throw error, try again' });
            return;
        }

        res.json({ message: '' });
    });
}

exports.setBlacklistElement = (req, res) => {
    const blacklistElem = req.body;

    db.query('INSERT INTO blacklist SET ?', blacklistElem, (err, result) => {
        if (err) {
            res.json({ error: 'Adding new blacklist element throw error, try again' });
            return;
        }

        res.json({ message: '' });
    });
}

exports.deleteProcess = (req, res) => {
    const { id } = req.body;

    db.query('DELETE FROM processes WHERE id = ?', [id], (err, result) => {
        if (err || result.affectedRows < 1) {
            res.json({ error: 'Deleting process throw error, try again' });
            return;
        }

        res.json({ message: '' });
    });
}

exports.deleteBlacklistElement = (req, res) => {
    const { id } = req.body;

    db.query('DELETE FROM blacklist WHERE id = ?', [id], (err, result) => {
        if (err || result.affectedRows < 1) {
            res.json({ error: 'Deleting blacklist element throw error, try again' });
            return;
        }

        res.json({ message: '' });
    });
}