const express = require('express');
const libApp = express();
const Book = require('app/models/book.js');

/**
 * Retrieve all books from database
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function getBooks(res) {
  Book.find(function(err, books) {
    if (err) { res.send(err); }

    res.json(books);
  });
}

express.get('/api/books', function(req, res) {});

express.post('/api/books', function(req, res) {});

express.put('/api/books/:id', function(req, res) {});

express.delete('/api/books/:id', function(req, res) {});

express.get('*', function(req, res) {});

express.listen(3000, function() {
  console.log('listening on port 3000');
})
