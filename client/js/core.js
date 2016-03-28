const bookLibraryApp = angular.module('bookLibraryApp', ['ngRoute', 'bookControllers', 'userController']);

bookLibraryApp.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers['x-access-token'] = $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  };
});

bookLibraryApp.config(['$routeProvider', '$httpProvider',
  ($routeProvider, $httpProvider) => {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    $httpProvider.interceptors.push('authInterceptor');

    $routeProvider.
      when('/', {
        templateUrl: 'partials/book-list.html',
        controller: 'BookListController',
      }).
      when('/api/books', {
        templateUrl: 'partials/book-list.html',
        controller: 'BookListController',
      }).
      when('/api/auth', {
        templateUrl: 'partials/user-auth.html',
        controller: 'UserController',
      });
  }]);
