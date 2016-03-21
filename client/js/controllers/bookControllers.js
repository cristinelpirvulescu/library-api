const bookControllers = angular.module('bookControllers', []);

bookControllers.controller('BookListController', ['$scope', '$http',
  ($scope, $http) => {
    $http.get('http://localhost:3000/api/books')
      .success((data) => {
        $scope.books = data;
        console.log(data);
      })
      .error((err) => {
        console.log(err);
      });

    $scope.orderProp = 'title';
  }]);
