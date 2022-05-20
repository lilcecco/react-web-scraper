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
    if (password !== confirmPassword) {
        res.json({ error: 'Passwords don\'t correspond' });
        return;
    }
        
    // hash password
    const hashedPassword = await bcrypt.hash(password, 8);

    // insert new user
    db.query('INSERT INTO users SET ?', {id, email, password: hashedPassword }, (err, results) => {
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

let refreshTokens = [];

exports.token = (req, res) => {
    const refreshToken = req.body.token; 

    if (refreshToken == null) return res.json({ error: 'Unathorized' });
    if (!refreshTokens.includes(refreshToken)) return  res.json({ error: 'Forbidden' });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.json({ error: 'Forbidden' });
        const accessToken = generateAccessToken(user);
        res.json({ accessToken });
    });
}

exports.logout = (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.json({ message: '' });
}

exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            res.json({ error: 'Login attempt throw error, try again' });
            return;
        }

        // check email
        if (results.length < 1) {
            res.json({ error: 'Invalid email or password' });
            return;
        }

        // check user
        if(await bcrypt.compare(password, results[0].password)) {
            const user = { id: results[0].id, email }

            const accessToken = generateAccessToken(user);
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
            refreshTokens.push(refreshToken);
            res.json({ accessToken, refreshToken });
            return;
        }

        // default returned value
        res.json({ error: 'Invalid email or password' });
    });
}

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}

exports.posts = (req, res) => {
    db.query('SELECT * FORM users WHERE id = ?', [req.user.id], (err, results) => {
        if (err) res.json({ error: 'Error' });

        res.json(results[0]);
    });
}