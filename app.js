var app = angular.module('plunker', ['pdfjsViewer']);

app.controller('MainCtrl', function($scope, $http, $compile) {
  $scope.test = function(){
    console.log("Test Success");
  };

  $scope.data = null; // this is loaded async

  $scope.pdf = {
      src: 'example.pdf',
  };


  $scope.initWaterMark = function(){
    console.log("initWaterMark");
    $scope.resetWaterMark=true;
  };

});