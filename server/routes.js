const express = require('express');
const router = express.Router();
const aiSimulator = require('./aiSimulator');

router.post('/', (req, res) => {
  const data = req.body;
  const recommendations = aiSimulator.analyze(data);
  res.json(recommendations);
});

module.exports = router;
