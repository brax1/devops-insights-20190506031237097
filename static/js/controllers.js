/*globals angular vm:true*/
/* eslint no-eval: 0 */
var ConsoleModule = angular.module('ConsoleModule', ['ngRoute']);

ConsoleModule.config(['$routeProvider', '$locationProvider','$sceDelegateProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $sceDelegateProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/Byzip.html',
        controller: 'wcontroller',
        controllerAs: 'wcontroller'
    });
}]);

ConsoleModule.controller('wcontroller', ['$scope', '$http', '$routeParams', '$timeout', '$sce',
    function($scope, $http, $routeParams, $timeout, $sce) {

    $scope.somemessage = "Some weather";
    $scope.zip1City = "";
    $scope.zip1Weather = "";
	//variable to hold a timer to wait for user input
	var t;
    $scope.zip = function(which) {

        var data = "";
        if(which === 1) {
            data = $scope.zip1m;
        } else if(which === 2) {
            data = $scope.zip2m;
        } else if(which === 3) {
            data = $scope.zip3m;
        } else if(which === 4) {
            data = $scope.zip4m;
        } 

        if(data.length >= 1) {
        	//clears a timeout to reset the timer everytime a new character is entered by user
        	
        	clearTimeout(t);
        	
        	//starts a new timer to ensure user is entering city name
        	
        	t = setTimeout(() =>
        	
            $http({
                method: "GET",
                url: '/api/v1/getWeather?city=' + data
            }).then( function(response) {
                if(which === 1) {
                    $scope.zip1City = response.data.city;
                    $scope.zip1Weather = response.data.weather;
                } else if(which === 2) {
                    $scope.zip2City = response.data.city;
                    $scope.zip2Weather = response.data.weather;
                } else if(which === 3) {
                    $scope.zip3City = response.data.city;
                    $scope.zip3Weather = response.data.weather;
                } else if(which === 4) {
                    $scope.zip4City = response.data.city;
                    $scope.zip4Weather = response.data.weather;
                } 
            }),500);
        } else {
            if(which === 1) {
                    $scope.zip1City = "";
                    $scope.zip1Weather = "";
                } else if(which === 2) {
                    $scope.zip2City = "";
                    $scope.zip2Weather = "";
                } else if(which === 3) {
                    $scope.zip3City = "";
                    $scope.zip3Weather = "";
                } else if(which === 4) {
                    $scope.zip4City = "";
                    $scope.zip4Weather = "";
                } 
        }
    };
    
}]);


angular.module("app",[]);

angular.module("app").controller("vm", function($scope, $element) {
  vm = $scope;
  // vm.html = '<script> /*globals google */ var map; function initMap() { map = new google.maps.Map(document.getElementById('map'), {center: {lat: -34.397, lng: 150.644}, zoom: 8 }); } </script>'
  vm.html = '<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCc0ZOpUE2XbUsFtimj-so3hq32h-HUpvs&callback=initMap"async defer></script>';
  
  //FIND script and eval 
  var js = $element.find("script")[0].innerHTML;
  eval(js);// jshint ignore:line

});