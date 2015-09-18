$(document).ready(function(){

	$(".sf-menu .li-nav-parent").mouseover(function() {
		$(this).find("ul").slideDown();
	}).mouseleave(function() {
		$(this).find("ul").slideUp();
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
  
});