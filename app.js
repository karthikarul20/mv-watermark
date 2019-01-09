var app = angular.module('plunker', ['pdfjsViewer']);

app.controller('MainCtrl', function($scope, $http, $compile) {
  $scope.test = function(){
    console.log("Test Success");
  };

  $scope.data = null; // this is loaded async

  $scope.pdf = {
      src: 'example.pdf',
  };

  $scope.hasWaterMark=false;

  $scope.enable = function(){
     $scope.hasWaterMark=true;
  }

   $scope.disable = function(){
     $scope.hasWaterMark=false;
  }



  $scope.initWaterMark = function(){
    console.log("initWaterMark");
    $scope.hasWaterMark=true;
  };

});