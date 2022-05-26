const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];

    const accessToken = req.cookies.accessToken;

    if (accessToken == null) return res.json({ error: 'Unauthorized' });

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.json({ error: 'Forbidden' });
        req.user = user;
        next();
    });
}