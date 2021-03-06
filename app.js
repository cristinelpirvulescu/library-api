const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const routes = require('./routes/routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('secretToken', config.secret);
/* Routes setup */
app.use('/api', routes);

app.get('*', (req, res) => {
  res.sendFile('./public/index.html', { root: __dirname });
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
