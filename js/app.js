var app = angular.module("portfolioApp",[]);
var needResize;

app.controller("contentCtrl",['$scope','$http', function($scope, $http) {
    $http.get("images/portfolio/json.php").success(function(response) {$scope.pics = response;});
    //$http.get("scripts/thumbs.php");
    /*
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
      */
$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
    $(function() {
      $('#slides').slidesjs({
        width: 650,
        height: 569,
        pagination: {
          effect: "fade"
        },
        navigation: {
          effect: "fade"
        },
        play: {
          active: true,
          auto: true,
          interval: 4000,
          swap: true,
          pauseOnHover: true,
          restartDelay: 3000,
          effect: "fade"
        },
        effect: {
          speed:300, //default
          crossfade:true //default
        },
        callback: {
          loaded: function(n) {
            $("#slides").append('<a id="full-screen" href="#">full screen</a>');
            // add in the thumbnails
            var i=1;
            $(".slidesjs-pagination-item").each(function(){
              $(this).find("a").css("background-image","url(thumbs/" + $(".slidesjs-control img:nth-child("+i+")").attr("src")+")");
              i++;
            });
          }
        }
      });
    });

    $("#full-screen").click(function() {
      if($(this).hasClass("is-full")) {
        $(this).removeClass("is-full");
        $(".slides-wrapper").removeClass("full-screen");
        $(".container").removeAttr("style");
      } else {
        $(this).addClass("is-full");
        $(".slides-wrapper").addClass("full-screen");
        needResize = true;
      }
      $(window).trigger('resize');
      return false;
    });

    $(window).resize(function() {
      if($("#full-screen").hasClass("is-full") && needResize) {
        var newWidth = 650/569*($(window).height()-25);
        if(newWidth > $(window).width()) {
          newWidth = $(window).width();
        }
        $(".container").css("width", newWidth + "px");
        needResize = false;
        $(window).trigger('resize');
      } else {
        needResize = true;
      }
    });
    
});
                    
// trigger page resize

}]);

app.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
});
