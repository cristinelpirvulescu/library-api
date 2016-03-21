const bookLibraryApp = angular.module('bookLibraryApp', ['ngRoute', 'bookControllers']);

bookLibraryApp.config(['$routeProvider',
  ($routeProvider) => {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/book-list.html',
        controller: 'BookListController',
      }).
      when('/api/auth', {
        templateUrl: 'partials/user-auth.html',
        controller: 'BookListController',
      }).
      when('/api/books', {
        templateUrl: 'partials/book-list.html',
        controller: 'BookListController',
      });
  },
  ]);
