const mysql = require('mysql');
const fetch = require('node-fetch');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.getScrapedData = (req, res) => {
    const getRawData = (url) => {
        return fetch(url)
            .then((res) => res.text())
            .then((data) => data)
            .catch(() => null);
    };

    const { id, blacklist } = req.body;

    db.query('SELECT * FROM processes WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.json({ error: 'Start process throw error, try again' });
            return;
        }

        const process = results[0];
        const urls = new Set(JSON.parse(process.urls));
        const data = JSON.parse(process.results) ?? [];
        let status = process.status;

        // scrape data
        const scrapeData = async () => {
            let firstIteration = true;

            for (let url of urls) {

                // change status
                if (firstIteration) {

                    status = 'RUNNING';
                    firstIteration = false;

                    db.query(`UPDATE processes SET status = ? WHERE id = ?`, [status, id], (err, results) => {
                        if (err) throw err; // da cambiare
                    });
                }

                // check urls blacklist
                if (blacklist.includes(url)) continue;

                // check protocol
                if (!/^(http\:|https\:)/.test(url)) url = `http://${url}`;

                const rawData = await getRawData(url);
                // catch fetch error
                if (!rawData) continue;

                // scrape email
                const email = /[\w\.\-]+@[a-z\-]+\.[a-z]{2,3}/.exec(rawData)?.[0];
                if (email) data.push(email);

                /*
                 * Numbers scraper (dismissed)
                 * 
                 * const number = /((\(?)(\+?)(39)(\)?)[\s]?)?(\d{3,4})([\s]?)(\d{3,})([\s]?)(\d{0,4})/.exec(rawData)?.[0];
                 * if (!data?.numbers) data.numbers = [];
                 * if (number) data.numbers.push(number);
                 */
            }

            // update status
            status = 'DONE';
            console.log(data); //check

            db.query(`UPDATE processes SET results = ?, status = ? WHERE id = ?`, [JSON.stringify(data), status, id], (err, result) => {
                if (err) {
                    res.json({ error: 'Start process throw error, try again' });
                    return;
                }
                
                res.json({ ...process, urls, status, results: data });
            });
        }

        scrapeData();
    });
}