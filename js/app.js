var app = angular.module("portfolioApp",[]);
var needResize;
var thumbWidth = 0;
var paginationLength = 0;
var lastSlide = 0;
var firstSlide = 1;

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
        height: 435,
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
            
            var slidesLength = $(".slidesjs-pagination-item").length;
            $("#slides").append('<a id="full-screen" href="#">full screen</a>');
            if($(window).width() > 760) {
                $(".slidesjs-pagination").wrap("<div id='pagination-wrapper'><div class='pagination-inner'></div></div>");
                $("#pagination-wrapper").append("<a href='#' class='pagination-btn' id='pagination-prev'></a><a href='#' class='pagination-btn' id='pagination-next'></a>");
                
                paginationLength = slidesLength*40;
                $(".slidesjs-pagination").css("width", paginationLength + "px");
                thumbWidth = $("#pagination-wrapper").width();
                lastSlide = Math.floor(thumbWidth/40);
                
                if(paginationLength > thumbWidth) {
                  $("#pagination-prev").hide();
                } else {
                  $(".pagination-btn").hide();
                }
                
                $(".slidesjs-pagination-item").each(function(){
                  var dirUrl = $(".slidesjs-control div:nth-child("+i+") img").attr("src").split(baseUrl);
                  $(this).find("a").css("background-image","url(" + baseUrl + "thumbs/" + dirUrl[1]+")");
                  i++;
                });
            } else {
                $("#slides").append('<div id="numbered-img"><span id="curr-img">1</span>/'+slidesLength+'</div>');
            }


          },
          start: function(n) {
            if(n >= lastSlide) {
                $("#pagination-next").trigger("click");
            } else if(n <= firstSlide) {
                $("#pagination-prev").trigger("click");
            }
          },
          complete: function(n) {
            if(n==1) {
                $(".slidesjs-pagination").animate({
                    left:0
                });
                $("#pagination-prev").hide();
                if(paginationLength > thumbWidth) {
                    $("#pagination-next").show();
                }
            }
            $("#curr-img").html(n);
          }
        }
      });
    });

    var ratio = 650/435;
    $(".slidesjs-control div img").load(function() {
      var imgRatio =  $(this).get(0).width / $(this).get(0).height;
      if(isNaN(imgRatio)) {
          $(".slidesjs-control div img").addClass("ie-exception");
      } else {
        if( ratio > imgRatio ) {
          $(this).addClass("tall");
        }
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
    
    $("#pagination-prev").click(function() {
        var move = $(".pagination-inner").width() - 40;
        var left = -1 * $(".slidesjs-pagination").position().left;
        if(left > 0) {
            if(move >= left) {
                move = 0;
                $(this).hide();
            } else {
                move = left - move;
            }
            $(".slidesjs-pagination").animate({
                left:(-1*move)
            },500,function() {
                var slideDiff = Math.floor(move/40);
                lastSlide = Math.floor(thumbWidth/40) + slideDiff;
                firstSlide = slideDiff + 1;
            });
            $("#pagination-next").show();
        } else {
            $(this).hide();
        }
        return false;
    });
    $("#pagination-next").click(function() {
        if(thumbWidth > 0) {
            var move = $(".pagination-inner").width() - 40;
            var diff = paginationLength - thumbWidth;
            var left = -1 * $(".slidesjs-pagination").position().left;
            console.log("move: " + move + ", diff: " + diff + ", left: " + left);
            if(diff > left) {
                move = left + move;
                if(move >= diff) {
                    move = diff;
                    $(this).hide();
                }
                $(".slidesjs-pagination").animate({
                    left:(-1*move)
                },500,function() {
                    var slideDiff = Math.floor(move/40);
                    lastSlide = Math.floor(thumbWidth/40) + slideDiff;
                    firstSlide = slideDiff + 1;
                });
                $("#pagination-prev").show();
            } else {
                $(this).hide();
            }
        }
        return false;
    });

    $(window).resize(function() {
      if($("#full-screen").hasClass("is-full") && needResize) {
        var newWidth = 650/569*($(window).height()-50);
        if(newWidth > $(window).width()) {
          newWidth = $(window).width();
        }
        $(".container").css("width", newWidth + "px");
        needResize = false;
        $(window).trigger('resize');
      } else {
        needResize = true;
      }
      thumbWidth = $("#pagination-wrapper").width();
      middleSlide = Math.round(thumbWidth/40/2);
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
