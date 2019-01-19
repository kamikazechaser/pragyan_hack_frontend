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
        .when("/partnerlogin", {
            templateUrl: "pages/partnerlogin.html",
            controller: "partnerLoginController",
        });
});

theGuides.controller("clientSignupController", function($scope, $http) {
    $scope.subReg = function () {
        // omegalul
        const firstName = $scope.first_name;
        const lastName = $scope.last_name;
        const email = $scope.email;
        const password = $scope.password;
        const age = $scope.age;
        const address = $scope.address;
        const interests = $scope.interests;
        const phone = $scope.phone;
        const sex = $scope.sex;
        $http.get(`http://127.0.0.1:3000/registerclient?email=${email}&firstName=${firstName}&${lastName}password=${password}&age=${age}&address=${address}&interests=${interests}&phone=${phone}&sex=${sex}`)
            .then((ctx) => {
                console.log("OK");
                //const statusCode = ctx.data.status;
              //  const message = ctx.data.message;

                if (statusCode === 200) {
                    //toastr.success(message);
                    //$location.path("/login");
                } else {
                    //toastr.error(message);
                }
            })
            .catch((error) => {
                console.error(error);
                //let error = ctx.data;
                //toastr.error(error);
            });
    }
});

theGuides.controller("partnerSignupController", function($scope, $http) {
    $scope.subReg = function () {
        // omegalul
        const firstName = $scope.first_name;
        const lastName = $scope.last_name;
        const email = $scope.email;
        const password = $scope.password;
        const age = $scope.age;
        const address = $scope.address;
        const languages = $scope.languages;
        const phone = $scope.phone;
        const sex = $scope.sex;
        $http.get(`http://127.0.0.1:3000/registerpartner?email=${email}&firstName=${firstName}&${lastName}&password=${password}&age=${age}&address=${address}&languages=${languages}&phone=${phone}&sex=${sex}`)
            .then((ctx) => {
                console.log("OK");
                //const statusCode = ctx.data.status;
              //  const message = ctx.data.message;

                if (statusCode === 200) {
                    //toastr.success(message);
                    //$location.path("/login");
                } else {
                    //toastr.error(message);
                }
            })
            .catch((error) => {
                console.error(error);
                //let error = ctx.data;
                //toastr.error(error);
            });
    }
});

theGuides.controller("clientLoginController", function($scope, $http) {
  $scope.subLogin = function () {
      // omegalul

       const email = $scope.email;
       const password = $scope.password;


      $http.get(`http://127.0.0.1:3000/loginclient?email=${email}&password=${password}`)
          .then((ctx) => {
              console.log("OK");
              //const statusCode = ctx.data.status;
            //  const message = ctx.data.message;

              if (statusCode === 200) {
                  //toastr.success(message);
                  //$location.path("/login");
              } else {
                  //toastr.error(message);
              }
          })
          .catch((error) => {
              console.error(error);
              //let error = ctx.data;
              //toastr.error(error);
          });

}
});

theGuides.controller("partnerLoginController", function($scope, $http) {
  $scope.subLogin = function () {
      // omegalul
      const email = $scope.email;
      const password = $scope.password;



      $http.get(`http://127.0.0.1:3000/loginpartner?email=${email}&password=${password}`)
          .then((ctx) => {
              console.log("OK");
              //const statusCode = ctx.data.status;
            //  const message = ctx.data.message;

              if (statusCode === 200) {
                  //toastr.success(message);
                  //$location.path("/login");
              } else {
                  //toastr.error(message);
              }
          })
          .catch((error) => {
              console.error(error);
              //let error = ctx.data;
              //toastr.error(error);
          });
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
