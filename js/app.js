
const theGuides = angular.module("theGuides", ["ngRoute"]);

const apiKey = "827ff99d0e44dd";

theGuides.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "pages/home.html",
            controller: "homeController",
        })
        .when("/clientlogin", {
            templateUrl: "pages/clientlogin.html",
            controller: "clientLoginController",
        })
        .when("/clientsignup", {
            templateUrl: "pages/clientsignup.html",
            controller: "clientSignupController",
        })
        .when("/partnersignup", {
            templateUrl: "pages/partnersignup.html",
            controller: "partnerSignupController",
        })
        .when("/partnerlogin", {
            templateUrl: "pages/partnerlogin.html",
            controller: "partnerLoginontroller",
        });
});

theGuides.controller("homeController", function ($scope, $http) {
    $scope.home = {};

    $scope.searchLocation = function() {
        $http.get(`http://photon.komoot.de/api/?q=${$scope.home.autocomplete}`).then(response => {
            const responseArray = response.data.features;
            $scope.items = responseArray.splice(0, 5);
        }).catch(error => {
            console.error(error);
        });
    }
});

theGuides.controller("partnerSignupController", function ($scope, $http) {
    $scope.partner = {};

    $scope.partner.partnerPage = true;
});

theGuides.controller("partnerLoginController", function ($scope, $http) {
    $scope.partner = {};

    $scope.partner.partnerPage = true;
});