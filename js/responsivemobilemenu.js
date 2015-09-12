/*

Responsive Mobile Menu v1.0
Plugin URI: responsivemobilemenu.com

Author: Sergio Vitov
Author URI: http://xmacros.com

License: CC BY 3.0 http://creativecommons.org/licenses/by/3.0/

*/

function responsiveMobileMenu() {	
		$('.rmm').each(function() {
			
			$(this).children('ul').addClass('rmm-main-list');	// mark main menu list
			
			var $style = $(this).attr('data-menu-style');	// get menu style
				if ( typeof $style == 'undefined' ||  $style == false )
					{
						$(this).addClass('graphite'); // set graphite style if style is not defined
					}
				else {
						$(this).addClass($style);
					}
	 	});
}
function getMobileMenu() {

	/* 	build toggled dropdown menu list */
	$('.rmm').each(function() {	
				var menutitle = $(this).attr("data-menu-title");
				if ( menutitle == "" ) {
					menutitle = "Menu";
				}
				else if ( menutitle == undefined ) {
					menutitle = "Menu";
				}
				var $menulist = $(this).children('.rmm-main-list').html();
				var $menucontrols ="<div class='rmm-toggled-controls'><div class='rmm-toggled-title'>" + menutitle + "</div><div class='rmm-button'><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span></div></div>";
				$(this).prepend("<div class='rmm-toggled rmm-closed'>"+$menucontrols+"<ul class='top-nav-parent'>"+$menulist+"</ul></div>");

		});
}

function adaptMenu() {
	
	/* 	toggle menu on resize */
	$('.rmm').each(function() {
			if ( $(this).parent().width() < 760) {
				$(this).children('.rmm-main-list').hide(0);
				$(this).children('.rmm-toggled').show(0);
			}
			else {
				$(this).children('.rmm-main-list').show(0);
				$(this).children('.rmm-toggled').hide(0);
			}
		});
		
}

$(function() {

	 responsiveMobileMenu();
	 getMobileMenu();
	 adaptMenu();
	 
	 /* slide down mobile menu on click */
	 
	 $('.rmm-toggled, .rmm-toggled .rmm-button').click(function(){
	 	if ( $(this).is(".rmm-closed")) {
		 	 $(this).find('ul.top-nav-parent').stop().slideDown(300);
		 	 $(this).removeClass("rmm-closed");
	 	}
	 	else {
		 	$(this).find('ul.top-nav-parent').stop().slideUp(300);
		 	 $(this).addClass("rmm-closed");
	 	}
		
	});

	 $(".parent-nav-item").click(function() {
	 	$(this).next("ul").slideToggle();
	 	return false;
	 });

});
	/* 	hide mobile menu on resize */
$(window).resize(function() {
 	adaptMenu();
});