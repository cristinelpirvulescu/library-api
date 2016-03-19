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

app.get('/api/books', getBooks);

app.post('/api/books', function(req, res) {
  const reqBody = req.body;

  const book = new Book({
    title: 'Test title',
  });

  book.save(function(err) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.put('/api/books/:id', function(req, res) {});

app.delete('/api/books/:id', function(req, res) {});

app.get('*', function(req, res) {});

app.listen(3000, function() {
  console.log('listening on port 3000');
});
