var express = require('express');
var router = express.Router();
const ScoresModel = require('../models/scores');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('test');
});

router.get('/scores', async (req, res, next) => {
  const allScores = await ScoresModel.getHighScores();
  res.json(allScores).status(200);
})

module.exports = router;
