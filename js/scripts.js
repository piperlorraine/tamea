$(document).ready(function(){

	$(".sf-menu .li-nav-parent").mouseover(function() {
		$(this).find("ul").fadeIn();
	}).mouseleave(function() {
		$(this).find("ul").fadeOut();
	});
        
        var width, height;
        if($(".youtube").length) {
            if($(".video-box").width() > 420) {
               width = 420;
               height = 315;
           } else {
               width = $(".video-box").width();
               height = (315/420) * width;
           }
        }
        $(".youtube").each(function() {
           var id = $(this).attr("data-video");
           var content = '<iframe width="'+width+'" height="'+height+'" src="https://www.youtube.com/embed/'+id+'" frameborder="0" allowfullscreen></iframe>';
           $(this).html(content);
        });
            

        
    $(function() {
      $('#slides').slidesjs({
        width: 940,
        height: 528,
        play: {
          active: true,
          auto: true,
          interval: 4000,
          swap: true
        }
      });
    });
});