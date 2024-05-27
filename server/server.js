const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());

app.use('/analyze', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
