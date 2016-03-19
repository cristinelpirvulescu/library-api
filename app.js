const express = require('express');
const app = express();
const Book = require('app/models/book.js');

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

app.put('/api/books/:id', function(req, res) {});

app.delete('/api/books/:id', function(req, res) {});

app.get('*', function(req, res) {});

app.listen(3000, function() {
  console.log('listening on port 3000');
});
