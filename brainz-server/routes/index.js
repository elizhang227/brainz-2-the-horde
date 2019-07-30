var express = require('express');
var router = express.Router();
const ScoresModel = require('../models/scores');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('test');
});

router.get('/highscores', async (req, res, next) => {
  const highScores = await ScoresModel.getHighScores();
  res.json(highScores).status(200);
})

router.get('/recentscores', async (req, res, next) => {
  const recentScores = await ScoresModel.getRecentScores();
  res.json(recentScores).status(200);
})

router.get('/my-scores/:id', async (req, res, next) => {
  console.log('req param', req.params)
  const myScores = await ScoresModel.getMyScores(req.params.id);
  res.json(myScores).status(200);
})


module.exports = router;
