var app = angular.module("Login", []);

/*app.config(function($routeProvider){

 $routeProvider
 .when('/',{
 templateUrl:'signin.ejs'
 })
 .when('/dashboard',{
 templateUrl: 'signin.ejs'
 })
 .otherwise({

 redirectTo:'/'
 });
 });*/

app.controller('loginCtrl', function ($scope, $http) {

    $scope.submit = function () {


        alert('in controller sending creds');
        $http({

            method: "POST",
            url: '/login',
            data: {

                username: $scope.username,
                password: $scope.password
            }
        }).success(function (res) {

            if (res.check == true) {


                window.location = '/dashboard';
            }
        }).error(function (err) {

            alert('Please enter the correct credentials !!');
        });


    }
});



