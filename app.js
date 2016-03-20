const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Book = require('./models/book');
const routes = require('./routes/routes');

//app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Routes setup */
app.use('/api', routes);

app.get('*', (req, res) => {
  res.sendFile('./public/index.html', { root: __dirname });
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
