var app = angular.module("portfolioApp",[]);
var needResize;

app.controller("contentCtrl",['$scope','$http', function($scope, $http) {
  $http.get(
    "images/portfolio/json.php", {
      params: {
        section: $("body").attr("id")
      }
    })
    .success(function(response) {$scope.pics = response;});

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
          interval: 5000,
          swap: false,
          pauseOnHover: false,
          restartDelay: 1000,
          effect: "fade"
        },
        effect: {
          fade: {
            speed:1000, //default
            crossfade:true //default
          }
        },
        callback: {
          loaded: function(n) {
            
            // add in the thumbnails
            var i=1;
            var baseUrl = "images/portfolio/";
            
            if($(window).width() > 760) {
                $("#slides").append('<a id="full-screen" href="#">full screen</a>');
                $(".slidesjs-pagination-item").each(function(){
                  var dirUrl = $(".slidesjs-control div:nth-child("+i+") img").attr("src").split(baseUrl);
                  $(this).find("a").css("background-image","url(" + baseUrl + "thumbs/" + dirUrl[1]+")");
                  i++;
                });
            }
          }
        }
      });
    });

    $(".slidesjs-control div img").one("load", function() {
      if( $(this).height() > $(".slidesjs-control").height() ) {
        $(this).addClass("tall");
      }
    }).each(function() {
      if(this.complete) $(this).load();
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
      } else if( $("#slides").hasClass("mobile-slides") ) {
          if($(".slidesjs-container").height() > $(window).height()) {
              // height is changed to window height
              // width is porportionately changed
              // resize needs to trigger again
              // but without going here? maybe "on orientation change" is where this should happen
              // though that is a jquery mobile thing...
          }
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
