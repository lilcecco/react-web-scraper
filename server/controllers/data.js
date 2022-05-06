const { json } = require('express/lib/response');
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
        
        const parsedResults = results.map(result => {return { ...result, categories: JSON.parse(result.categories), urls: JSON.parse(result.urls), results: JSON.parse(result.results) }});
        res.json(parsedResults);
    });
}

exports.getBlacklist = (req, res) => {
    db.query('SELECT * FROM blacklist', (err, results) => {
        if (err) throw err; // da cambiare

        res.json(results);
    });
}

exports.setProcess = (req, res) => {
    const process = req.body;
    const parsedProcess = { ...process, categories: JSON.stringify(process.categories), urls: JSON.stringify(process.urls), results: JSON.stringify(process.results) };

    db.query('INSERT INTO processes SET ?', parsedProcess, (err, result) => {
        if (err) {
            res.json({ error: 'Adding new process throw error, try again' });
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