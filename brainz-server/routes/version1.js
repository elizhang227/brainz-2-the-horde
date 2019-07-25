const express = require('express'),
    router = express.Router(),
    KillCountModel = require('../models/killCount');

router.get('/', async (req, res, next) => {
    res.send('welcome yurrrrr').status(200)
})

router.get('/all', async (req, res, next) => {
    const allKills = await KillCountModel.getAllKills();
    console.log('candidates', allKills)
    res.json(allKills).status(200);
});

module.exports = router;