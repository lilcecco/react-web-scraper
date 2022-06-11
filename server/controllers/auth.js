const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req, res) => {
    const { id, email, password, confirmPassword } = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) throw err; // da cambiare

        // check if email already exists
        if (results.length > 0) return res.json({ error: 'Account with this email already exists' });

        // check confirm password
        if (password !== confirmPassword) return res.json({ error: 'Passwords don\'t correspond' });

        // hash password
        const hashedPassword = await bcrypt.hash(password, 8);

        // create customer
        const customer = await stripe.customers.create({
            email: email
        });

        // insert new user
        db.query('INSERT INTO users SET ?', { id, email, password: hashedPassword, customer_id: customer.id }, (err, results) => {
            if (err) {
                console.log(err);
                // possiamo toglierlo --> aggiunto controllo prima
                switch (err.errno) {
                    case 1062:
                        res.json({ error: 'Account with this email already exists' });
                        return;
                    default:
                        res.json({ error: 'Adding new user throw error, try again' });
                        return;
                }
            }

            res.json({ message: '' });
        });
    });
}

exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.json({ error: 'Login attempt throw error, try again' });

        // check email
        if (results.length < 1) return res.json({ error: 'Invalid email or password' });

        // check user
        if (await bcrypt.compare(password, results[0].password)) {
            const user = { id: results[0].id }

            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            return res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'Strict' }).json({ message: '' });
        }

        // default returned value
        res.json({ error: 'Invalid email or password' });
    });
}

exports.logout = (req, res) => {
    res.clearCookie('accessToken').json({ message: '' });
}