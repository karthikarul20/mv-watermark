var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
  $scope.test = function(){
    console.log("Test Success");
  };
});