var app = angular.module("portfolioApp",['bootstrapLightbox']);

angular.module('portfolioApp').config(function (LightboxProvider) {
  // set a custom template
  LightboxProvider.templateUrl = 'lightbox2.html';

  // the modal height calculation has to be changed since our custom template is
  // taller than the default template
  LightboxProvider.calculateModalDimensions = function (dimensions) {
    var width = Math.max(400, dimensions.imageDisplayWidth + 32);

    if (width >= dimensions.windowWidth - 20 || dimensions.windowWidth < 768) {
      width = 'auto';
    }

    return {
      'width': width,                             // default
      'height': 'auto'                            // custom
    };
  };
});

app.controller("contentCtrl",['$scope','$http','Lightbox', function($scope, $http, Lightbox) {
    $http.get("images/portfolio/json.php").success(function(response) {$scope.pics = response;});
    $http.get("scripts/thumbs.php");
    
    $scope.openLightboxModalLandscape = function (index) {
        Lightbox.openModal($scope.pics.landscape, index);
    };
    $scope.openLightboxModalStill = function (index) {
        Lightbox.openModal($scope.pics.still, index);
    };
    $scope.openLightboxModalFigure = function (index) {
        Lightbox.openModal($scope.pics.figure, index);
    };
    $scope.openLightboxModalCollage = function (index) {
        Lightbox.openModal($scope.pics.collage, index);
    };
    $scope.openLightboxModalPortrait = function (index) {
        Lightbox.openModal($scope.pics.portrait, index);
    };
  
}]);
