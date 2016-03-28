angular.module('bookService', [])
  .factory('Books', ['$http', '$window', function($http, $window) {
    const baseUrl = 'http://localhost:3000';
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    return {
      auth: function(bookData) { return $http.post(baseUrl + '/api/auth', bookData); },
      get: function() { return $http.get(baseUrl + '/api/books'); },
      create: function(bookData) { return $http.post(baseUrl + '/api/books', bookData); },
      update: function(bookData) { return $http.put(baseUrl + '/api/books/' + id, bookData); },
      delete: function(id) { return $http.delete(baseUrl + '/api/books/' + id); },
    };
  }]);
