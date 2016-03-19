const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Book = require('./models/book.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const getBooks = (req, res) => {
  Book.find((err, books) => {
    if (err) {
      return res.send(err);
    }

    return res.json(books);
  });
};

const addBook = (req, res) => {
  const reqBody = req.body;

  const newBook = new Book({
    title: reqBody.title,
    author: reqBody.author,
    ISBN: reqBody.isbn,
    genre: reqBody.genre,
    year: reqBody.year,
  });

  newBook.save((err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};

app.get('/api/books', getBooks);

app.post('/api/books', addBook);

app.put('/api/books/:id', function(req, res) {
  const reqBody = req.body;

  Book.findOneAndUpdate({ _id: '56edcb41aef1a07f610f2256' }, reqBody, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete('/api/books/:id', function(req, res) {});

app.get('*', function(req, res) {
    res.sendFile('public/index.html', {root: __dirname});
});

app.listen(3000, function() {
  console.log('listening on port 3000');
});
