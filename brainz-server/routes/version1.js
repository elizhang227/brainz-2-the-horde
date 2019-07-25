const express = require('express'),
    router = express.Router(),
    ScoresModel = require('../models/scores');

router.get('/', async (req, res, next) => {
    res.send('welcome yurrrrr').status(200)
})

router.get('/all', async (req, res, next) => {
    const allKills = await ScoresModel.getAllScores();
    console.log('candidates', allKills)
    res.json(allKills).status(200);
});

module.exports = router;