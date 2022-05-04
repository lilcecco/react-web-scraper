const express = require('express');

const router = express.Router();

router.get('/processes', (req, res) => {
    res.json([
        {
            id: 1,
            name: "Autoscuole Milano",
            categories: [
                "email"
            ],
            urls: [],
            status: "START",
            results: []
        },
        {
            id: 2,
            name: "Autoscuole Roma",
            categories: [
                "email",
                "numbers"
            ],
            urls: [],
            status: "RESULT"
        },
    ])
});

router.get('/blacklist', (req, res) => {
    res.json([
        {
            id: 1,
            text: "maoce007@gmail.com"
        },
        {
            id: 2,
            text: "333 333 3333"
        },
    ])
});

module.exports = router;