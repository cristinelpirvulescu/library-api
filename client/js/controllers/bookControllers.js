const bookControllers = angular.module('bookControllers', ['bookService']);

bookControllers.controller('BookListController', ['$scope', '$http', '$httpParamSerializer', 'Books',
  ($scope, $http, $httpParamSerializer, Books) => {
    $scope.form = {};
    $scope.loading = {};

    Books.get()
      .success((data) => {
        $scope.books = data;
        $scope.loading = false;
      })
      .error((err) => {
        console.log(err);
      });

    $scope.createBook = () => {
      if ($scope.form != undefined) {
        $scope.loading = true;

        console.log($httpParamSerializer($scope.form));
        Books.create($httpParamSerializer($scope.form))
          .success((data) => {
            $scope.loading = false;
            $scope.form = {};
            $scope.books = data;
          })
          .error((err) => {
            console.log('Error: ' + err);
          });
      } else {
        console.log($scope);
      }

    };

    $scope.orderProp = 'title';
  }]);
