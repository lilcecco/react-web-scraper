const mysql = require('mysql');
const fetch = require('node-fetch');
const puppeteer = require('puppeteer');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.scrapeEmailFromWebsites = (req, res) => {
    const { id, blacklist } = req.body;

    const getRawData = (url) => {
        return fetch(url)
            .then((res) => res.text())
            .then((data) => data)
            .catch(() => null);
    };

    db.query('SELECT * FROM processes WHERE id = ?', [id], (err, results) => {
        if (err) return res.json({ error: 'Start process throw error, check your connection try again' });

        const process = results[0];
        let places = JSON.parse(process.places);

        db.query("UPDATE processes SET status = 'running' WHERE id = ?", [id], (err, results) => {
            if (err) return res.json({ error: 'Start process throw error, check your connection try again' });

            (async () => {
                for (let place of places) {

                    let url = place.website;

                    // check if url is undefined
                    if (!url) continue;

                    // check protocol exists
                    if (!/^(http\:|https\:)/.test(url)) url = `http://${url}`;

                    // convert url in URL obj
                    url = new URL(url);

                    // check blacklist urls
                    if (blacklist.includes(url.hostname.replace(/www\./, ''))) continue;

                    const rawData = await getRawData(url.href);

                    // catch fetch error
                    if (!rawData) continue;

                    // scrape email
                    const email = /[\w\.\-]+@[a-z\-]+\.[a-z]{2,3}/.exec(rawData)?.[0];
                    if (email) place.email = email;
                }

                console.log(places);

                db.query("UPDATE processes SET status = 'done', places = ? WHERE id = ?", [JSON.stringify(places), id], (err, results) => {
                    if (err) return res.json({ error: 'Scrape data throw error, try again' });

                    res.json({ ...process, status: 'done', places });
                });
            })();
        });
    });
}

exports.scrapeDataFromGoogleMaps = (req, res) => {
    const { id } = req.body;

    const acceptCookie = async (page) => {
        try {
            await page.click('button[aria-label="Accetta tutto"]');
        } catch (err) {
            console.log(err);
        }
    }

    const autoScroll = async (page) => {
        await page.evaluate(async () => {
            await new Promise((resolve, reject) => {
                let totalHeight = 0;
                let distance = 300;
                let timer = setInterval(() => {
                    const element = document.querySelectorAll('.ecceSd')[1];
                    let scrollHeight = element.scrollHeight;
                    element.scrollBy(0, distance);
                    totalHeight += distance;

                    if (totalHeight >= scrollHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });
    }

    const parsePlaces = async (page) => {
        let places = [];

        const elements = await page.$$('.qBF1Pd');
        if (elements && elements.length) {
            for (const el of elements) {

                const name = await el.evaluate(span => span.textContent.replace(/^\s+|\s+$|\"+/gm, ''));

                let url;

                try {
                    url = await page.$eval(`a[aria-label="${name}"]`, el => el.href);
                } catch (err) {
                    console.log(err);
                }

                places.push({ name, url });
            }
        }

        return places;
    }

    const parseData = async (place) => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        try {
            await page.goto(place.url);
        } catch (err) {
            console.log(err);
        }

        await acceptCookie(page);
        await page.waitForNetworkIdle();

        const data = await page.$$eval('.CsEnBe', elements => {
            let data = {};
            if (elements && elements.length) {
                for (const element of elements) {
                    if (/^Sito web:/.test(element.ariaLabel)) {
                        data.website = element.href;
                    }

                    if (/^Telefono:/.test(element.ariaLabel)) {
                        data.number = /\d{2,4}\s?\d{3,6}\s?\d{0,4}/.exec(element.ariaLabel)[0];
                    }
                }
            }
            return data;
        });

        browser.close();

        return data;
    }

    db.query('SELECT * FROM processes WHERE id = ?', [id], (err, results) => {
        if (err) return res.json({ error: 'Errore, prova di nuovo.' });

        // return error function
        const returnError = (typeError) => {
            notices.unshift(typeError);

            db.query('UPDATE processes SET notices = ? WHERE id = ?', [JSON.stringify(notices), id], (err, results) => {
                if (err) return res.json({ error: 'Errore, prova di nuovo.' });

                res.json({ error: typeError });
            });
        }

        const process = results[0];
        const url = process.maps_url;
        let notices = JSON.parse(process.notices);

        db.query("UPDATE processes SET status = 'running' WHERE id = ?", [id], (err, results) => {
            if (err) return returnError('GenericScrapeError');

            (async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();

                await page.setViewport({
                    width: 1300,
                    height: 900
                });

                try {
                    await page.goto(url);
                } catch (err) {
                    console.log(err);
                    return returnError('InvalidUrl');
                }

                await acceptCookie(page);
                await page.waitForNetworkIdle();

                let places = [];

                do {
                    await autoScroll(page);

                    places = await parsePlaces(page);

                } while (!await page.$('.HlvSq'))

                browser.close();

                for (let i = 0; i < places.length; i++) {
                    try {
                        places[i] = { ...places[i], ...(await parseData(places[i])) };
                    } catch (err) {
                        console.log(err);
                        return returnError('GenericScrapeError');
                    }
                }

                console.log(places);

                // update notices
                notices.unshift('UpdateProcess', 'ScrapeSuccess');

                db.query("UPDATE processes SET status = 'done', places = ?, notices = ? WHERE id = ?", [JSON.stringify(places), JSON.stringify(notices), id], (err, results) => {
                    if (err) return res.json({ error: 'Errore, prova di nuovo.' });

                    res.json({ ...process, status: 'done', places, notices });
                });
            })();
        });
    });
}

exports.updateProcessType = (req, res) => {
    const { id } = req.body;

    // return error function
    const returnError = (typeError) => {
        db.query('SELECT notices FROM processes WHERE id = ?', [id], (err, results) => {
            if (err) return res.json({ error: 'Errore, prova di nuovo.' });

            let notices = JSON.parse(results[0].notices);
            notices.unshift(typeError);

            db.query('UPDATE processes SET notices = ? WHERE id = ?', [JSON.stringify(notices), id], (err, results) => {
                if (err) return res.json({ error: 'Errore, prova di nuovo.' });

                res.json({ error: typeError });
            });
        });
    }

    db.query("UPDATE processes SET type = 'Websites', status = 'start' WHERE id = ?", [id], (err, results) => {
        if (err) return returnError('UpdateProcessError');

        res.json({ message: 'UpdateProcessSuccess' });
    });
}