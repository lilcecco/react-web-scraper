const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = async (req, res) => {
    const { id, email, password, confirmPassword } = req.body;

    // check confirm password
    if (password !== confirmPassword) return res.json({ error: 'Passwords don\'t correspond' });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 8);

    // insert new user
    db.query('INSERT INTO users SET ?', { id, email, password: hashedPassword }, (err, results) => {
        if (err) {
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
}

exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.json({ error: 'Login attempt throw error, try again' });

        // check email
        if (results.length < 1) return res.json({ error: 'Invalid email or password' });

        // check user
        if (await bcrypt.compare(password, results[0].password)) {
            const user = { id: results[0].id, passwordLength: password.length }

            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            return res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'Strict' }).json({ message: '' });
        }

        // default returned value
        res.json({ error: 'Invalid email or password' });
    });
}

exports.logged = (req, res) => {
    const { id, passwordLength } = req.user;

    db.query('SELECT email FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return res.json({ error: 'No users found' });

        const result = results[0];
        res.json({ email: result.email, passwordLength });
    });
}

exports.logout = (req, res) => {
    res.clearCookie('accessToken').json({ message: '' });
}