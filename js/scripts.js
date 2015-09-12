$(document).ready(function(){

	$(".sf-menu .li-nav-parent").mouseover(function() {
		$(this).find("ul").fadeIn();
	}).mouseleave(function() {
		$(this).find("ul").fadeOut();
	}).click(function() {
		$(this).find("ul").toggle();
	});

});