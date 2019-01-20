function supportsLocalStorage() {
    return typeof (Storage) !== 'undefined';
}

if (!supportsLocalStorage()) {
    alert("Upgrade your browser to use this service.")
} else {
    console.log("localStorage available!")
}

function pushToStore(key, value) {
    return localStorage.setItem(key, value);
}

function getFromStore(key) {
    return localStorage.getItem(key);
}

function clearStore() {
    return localStorage.clear();
}

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
        .when("/partnerdashboard", {
            templateUrl: "pages/partnerdashboard.html",
            controller: "partnerDashboardController",
        })
        .when("/clientdashboard", {
            templateUrl: "pages/clientdashboard.html",
            controller: "clientDashboardController",
        })
        .when("/newlocation", {
            templateUrl: "pages/newpartnerlocation.html",
            controller: "newLocationController",
        })
        .when("/partnerlogin", {
            templateUrl: "pages/partnerlogin.html",
            controller: "partnerLoginController",
        })
        .when("/newpartnerlocation", {
            templateUrl: "pages/newpartnerlocation.html",
            controller: "newPartnerLocationController",
        })

        .when("/clientbookinghistory" ,{
            templateUrl : "pages/booking.html",
            controller:"clientBookingHistory",
        });
});

theGuides.controller("headerController", function ($scope, $window, $location) {
    $scope.status = getFromStore("signed_in")
    $scope.signOut = function () {
        clearStore()
        $window.location.reload();
        $location.path("/")
    }
});

theGuides.controller("clientSignupController", function ($scope, $http, $location) {
    $scope.subReg = function () {
        const firstName = $scope.first_name;
        const lastName = $scope.last_name;
        const email = $scope.email;
        const password = $scope.password;
        const age = $scope.age;
        const address = $scope.address;
        const interests = $scope.interests;
        const phone = $scope.phone;
        const sex = $scope.sex;

        $http.get(`http://127.0.0.1:3000/registerclient?email=${email}&name=${firstName} ${lastName}&password=${password}&age=${age}&address=${address}&interests=${interests}&phone=${phone}&sex=${sex}`)
            .then((ctx) => {
                const message = ctx.data.message;

                toastr.success(message);
                $location.path("/clientlogin");
            })
            .catch((error) => {
                console.error(error);
            });
    }
});

theGuides.controller("partnerSignupController", function ($scope, $http, $location) {
    $scope.subReg = function () {
        const firstName = $scope.first_name;
        const lastName = $scope.last_name;
        const email = $scope.email;
        const password = $scope.password;
        const age = $scope.age;
        const address = $scope.address;
        const languages = $scope.languages;
        const phone = $scope.phone;
        const sex = $scope.sex;
        $http.get(`http://127.0.0.1:3000/registerpartner?email=${email}&name=${firstName} ${lastName}&password=${password}&age=${age}&address=${address}&languages=${languages}&phone=${phone}&sex=${sex}`)
            .then((ctx) => {
                const message = ctx.data.message;

                toastr.success(message);
                $location.path("/partnerlogin");

            })
            .catch((error) => {
                console.error(error);
            });
    }
});

theGuides.controller("clientLoginController", function ($scope, $http, $location, $window) {
    $scope.subLogin = function () {
        const email = $scope.email;
        const password = $scope.password;

        $http.get(`http://127.0.0.1:3000/loginclient?email=${email}&password=${password}`)
            .then((ctx) => {
                const statusCode = ctx.data.status;
                const message = ctx.data.message;

                if (statusCode === 200) {
                    toastr.success(message);
                    pushToStore("signed_in", true);
                    pushToStore("email", email);
                    pushToStore("partner", false);
                    $location.path("/clientdashboard");
                    $window.location.reload();
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
});

theGuides.controller("partnerLoginController", function ($scope, $http, $location, $window) {
    $scope.subLogin = function () {
        const email = $scope.email;
        const password = $scope.password;

        $http.get(`http://127.0.0.1:3000/loginpartner?email=${email}&password=${password}`)
            .then((ctx) => {
                const message = ctx.data.message;
                const statusCode = ctx.data.status;

                if (statusCode === 200) {
                    toastr.success(message);
                    pushToStore("signed_in", true);
                    pushToStore("email", email);
                    pushToStore("partner", true);
                    $location.path("/partnerdashboard");
                    $window.location.reload();
                } else {
                    toastr.error(message);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
});

theGuides.controller("clientDashboardController", function($scope, $http, $location) {
  $scope.openBookings = function () {
      const email = getFromStore("email");
      $http.get(`http://127.0.0.1:3000/clientbookinghistory?email=${email}`)
          .then((ctx) => {
              const message = ctx.data.message;
              const statusCode = ctx.data.status;

              if (statusCode === 200) {
                  toastr.success(message);
                  $location.path("/clientbookinghistory");
              } else {
                  toastr.error(message);
              }
          })
          .catch((error) => {
              console.error(error);
          });
    }
});

theGuides.controller("partnerDashboardController", function($scope, $http, $location) {
  $scope.addNewPartnerLocation = function () {
                  $location.path("/newpartnerlocation");
      }
});

theGuides.controller("homeController", function ($scope, $http) {
    $scope.home = {};

    $scope.searchLocation = function () {
        $http.get(`http://photon.komoot.de/api/?q=${$scope.home.autocomplete}`).then(response => {
            const responseArray = response.data.features;
            $scope.items = responseArray.splice(0, 5);
        }).catch(error => {
            console.error(error);
        });
    }
});

theGuides.controller("newLocationController", function ($scope, $window) {

    $scope.subNewLoc = function () {
        const lat = $window.lat;
        const lon = $window.lon;

        $http.get(`http://127.0.0.1:3000/subnewpartnerlocation?=${email}&password=${password}`)
            .then((ctx) => {
                const message = ctx.data.message;
                const statusCode = ctx.data.status;

                if (statusCode === 200) {
                    toastr.success(message);
                    $location.path("/partnerdashboard");
                } else {
                    toastr.error(message);
                }
            })
            .catch((error) => {
                console.error(error);
            });


    }
})
