const bookLibraryApp = angular.module('bookLibraryApp', ['ngRoute', 'bookControllers']);

bookLibraryApp.config(['$routeProvider',
  ($routeProvider) => {
    $routeProvider.
      when('/api/books', {
        templateUrl: 'partials/book-list.html',
        controller: 'BookListController',
      }).
      otherwise({
        redirectTo: '/',
      });
  },
  ]);
