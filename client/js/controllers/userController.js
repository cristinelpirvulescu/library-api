const userController = angular.module('userController', ['bookService']);

userController.controller('UserController', ['$scope', '$http', '$httpParamSerializer', '$window', 'Books', function ($scope, $http, $httpParamSerializer, $window, Books) {
  $scope.user = { username: 'testuser', password: 'password' };
  $scope.message = '';

  $scope.submit = function () {
    //console.log($httpParamSerializer($scope.user));
    Books.auth($httpParamSerializer($scope.user))
      .success(function (data) {
        console.log(data);
        $window.sessionStorage.token = data.token;
        $scope.message = 'Welcome';
      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        //console.log(status);
        delete $window.sessionStorage.token;

        // Handle login errors here
        $scope.message = 'Error: Invalid user or password';
      });
  };
}]);
