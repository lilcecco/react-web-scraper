const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

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
        if (password !== confirmPassword) return res.json({ error: 'Passwords do not match' });

        // hash password
        const hashedPassword = await bcrypt.hash(password, 8);

        // create customer
        const customer = await stripe.customers.create({
            email: email
        });

        // insert new user
        db.query('INSERT INTO users SET ?', { id, email, password: hashedPassword, customer_id: customer.id }, (err, results) => {
            if (err) return res.json({ error: 'Adding new user throw error, try again' });

            res.json({ message: 'Account correctly created' });
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

// nodemailer mailtrap test account config
const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "34ae8c6fd69644",
        pass: "dd49ac613a75ab"
    }
});

// nodemailer gmail config
// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD
//     }
// });

exports.resetPasswordEmail = (req, res) => {
    const { email } = req.body;

    db.query('SELECT id FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return res.json({ error: 'Reset password email sending throw error, try again' });

        if (results.length < 1) return res.json({ error: 'No accounts found with the inserted email' });

        const resetPasswordToken = jwt.sign({ id: results[0].id }, process.env.RESET_PASSWORD_TOKEN_SECRET, { expiresIn: '10m' });

        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'Reset password',
            html: `
            <!DOCTYPE html>

            <head>
            <meta charset="UTF-8">
            <style>
                *,
                *::after,
                *::before {
                    box-sizing: border-box;
                    padding: 0;
                    margin: 0;
                }

                body {
                    font-family: sans-serif;
                    font-size: 18px;
                }

                .container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                }

                h4 {
                    text-align: center;
                    line-height: 1.5;
                }

                li {
                    line-height: 1.5;
                }

                a {
                    text-decoration: none;
                }

                .button {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 110px;
                    height: 45px;
                    border-radius: 22.5px;
                    cursor: pointer;
                    border: 2px solid #275BE2;
                    color: #275BE2;
                }

                .sub {
                    font-size: 14px;
                    color: #D0CDE0;
                }

                .mt-1 {
                    margin-top: 20px;
                }

                .mt-2 {
                    margin-top: 40px;
                }
            </style>
            </head>

            <body>
            <div class="container">
                <h1>Reset password</h1>
                <h4 class="mt-2">To reset your password follow the next steps:</h4>
                <ul class="mt-1">
                    <li>Click on the following button</li>
                    <li>Write the new password</li>
                    <li>Login with the new password</li>
                </ul>
                <a href="${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}"><div class=" button mt-2">GO!</div></a>
                <p class="sub mt-1">*the link will be active for 10 minutes</p>
                </div>
            </body>

            </html>`,
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) return res.json({ error: 'Reset password email sending throw error, try again' });
    
            res.json({ message: 'Email correctly sended, check your mailbox' });
        });
    });
}

exports.verifyResetPasswordToken = (req, res) => {
    const { token } = req.body;

    jwt.verify(token, process.env.RESET_PASSWORD_TOKEN_SECRET, (err, user) => {
        if (err) return res.json({ error: 'Forbidden' });

        res.json({ message: '', userId: user.id });
    });
}

exports.resetPassword = async (req, res) => {
    const { userId, password, confirmPassword } = req.body;

    // check confirm password
    if (password !== confirmPassword) return res.json({ error: 'Passwords do not match' });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 8);
    
    // update password
    db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId], (err, results) => {
        if (err) return res.json({ error: 'Update password throw error, try again' });

        res.json({ message: 'Password correctly updated' });
    });
}