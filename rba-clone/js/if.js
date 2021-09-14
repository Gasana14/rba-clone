

 $(function(){
	$('img.showloading').imgPreload()
});

function getmorearticles(categ,start_point){
	var rt = $('#global_data').data('rt');
	var sectionID = categ.toLowerCase();
	if(sectionID=="local"){
		sectionID = 'news';
	}
     $('#'+sectionID+'.mainSection .getmorearticlesBtn').html('');
    var cur_html = $('#'+sectionID+'.mainSection .articles_main_content').html();
	$('#'+sectionID+'.mainSection .articles_main_content').append('<center><img src="'+rt+'/IMG/srg-load.gif"></center>');
     $.ajax({
         type: "GET",
         url: 'articles_pro.php', 
         dataType: 'html',
         data : {
            'task': 'getarticles',
            'categ': categ,
            'start_point': start_point
         },
         success: function(data) {
           
            $('#'+sectionID+'.mainSection .articles_main_content').html(cur_html+data);
            return true;
         },
         error : function(error) {
             return true;
         }
     });
}

$(document).ready(function(){
    $('#main_search_open').click(function(){
		$('#main_search_open').hide();
		if($("#search_input").hasClass('open')){
			$("#search_input").removeClass('open');
			$(".main_nav_ul").show(200);
			$("#search_input").hide(200);
		}else{
			$(".main_nav_ul").hide(200);
			$("#search_input").show(200);
			$("#search_input").addClass('open');
		}
		return false;
    });
	$("#main_search_form").submit(function(){
		if($("#search_input").val()){
            return true;
			
        }else{			
			$("#search_input").removeClass('open');
			$(".main_nav_ul").show(200);
			$("#search_input").hide(200);
            $('#main_search_open').show();
			return false;
        }
	});
	
	$('html').click(function() {
		$("#search_input").removeClass('open');
		$(".main_nav_ul").show(200);
		$("#search_input").hide(200);
		$('#main_search_open').show(200);
	});
	$('#main_search_btn').click(function(event){
		event.stopPropagation();
	});
	$('#main_search_form').click(function(event){
		event.stopPropagation();
	});
});
	
$(document).ready(function(){
	$('.radio_stream_container .jp-play').click(function(){
		var rt = $('#global_data').data('rt');
		if($('.audio_signals').hasClass('pause')){
			$('.audio_signals').removeClass('pause');
			$('.audio_signals').html('<img src="'+rt+'/img/player_on.gif">');
		}else{
			$('.audio_signals').html('<img src="'+rt+'/img/player_off.png">');
			$('.audio_signals').addClass('pause');
		}
	});
});
	
$(document).ready(function(){
	$('.podcast_row .jp-play').click(function(e){
		var el_id = this.id;
		var id_num = $('#'+el_id).data('id');
		var rt = $('#global_data').data('rt');
		if($('.podcast_signals.num_'+id_num).hasClass('pause')){
			$('.podcast_signals').addClass('pause');
			$('.podcast_signals').html('<img src="'+rt+'/img/player_off.png">');
			$('.podcast_signals.num_'+id_num).removeClass('pause');
			$('.podcast_signals.num_'+id_num).html('<img src="'+rt+'/img/player_on.gif">');
		}else{
			$('.podcast_signals').html('<img src="'+rt+'/img/player_off.png">');
			$('.podcast_signals').addClass('pause');
		}
	});
});

function showPodCastSignals(id_num){
		$('.podcast_signals').addClass('pause');
		var rt = $('#global_data').data('rt');
		$('.podcast_signals').html('<img src="'+rt+'/img/player_off.png">');
		$('.podcast_signals.num_'+id_num).removeClass('pause');
		$('.podcast_signals.num_'+id_num).html('<img src="'+rt+'/img/player_on.gif">');

}
	
$(document).ready(function(){
	$('.podcast_row .jp-stop').click(function(e){
		var rt = $('#global_data').data('rt');
		$('.podcast_signals').html('<img src="'+rt+'/img/player_off.png">');
		$('.podcast_signals').addClass('pause');
	});
});


function video_view_close_btn(){
	if($("#view_video_canv").hasClass('open')){
		$("#view_video_canv").removeClass('open');
		$("#view_video_canv").html('');
	}
}
function video_view_toogle_btn(id){
	var rt = $('#global_data').data('rt');
	if(!$("#view_video_canv").hasClass('open')){	
		$.ajax({
			 type: "GET",
			 url: rt+'/video_popup_canv.php', 
			 dataType: 'html',
			 data : {
				'task': 'getvideo',
				'id': id
			 },
			 success: function(data) {
				$('#view_video_canv').html(data);
				return true;
			 },
			 error : function(error) {
				 video_view_toogle_btn(id);
			 }
		 });
		$("#view_video_canv").html('<button class="btn video_view_close_btn" onclick="video_view_close_btn()">X</button><img style="margin-top: 20%; margin-left: 49%; " src ="img/charging.gif" >');
		$("#view_video_canv").addClass('open');
	}
}



$(document).scroll(function(){
	isScrolledIntoView('#topNavHidden');
});

// function isScrolledIntoView(elem)
// {
    // var $elem = $(elem);
    // var $window = $(window);

    // var docViewTop = $window.scrollTop();
    // var docViewBottom = docViewTop + $window.height();

    // var elemTop = $elem.offset().top;
    // var elemBottom = elemTop + $elem.height();
 
	// var ret = ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	
	// if(ret == false){
		// if(!$('#topNavMenu').hasClass('fixed')){
			// $('#topNavMenu').addClass('fixed');
			// $('#topNavMenu').hide();
			// $('#topNavMenu').slideDown(10);
			// $('#topNavHasher').addClass('activated');
		// }
		////$('#topNavMenu').addClass('scrolltop');
	// }else{
		// $('#topNavMenu').removeClass('fixed');
			// $('#topNavHasher').removeClass('activated');
	// }
// }

var navbar = document.getElementById("topNavMenu");
var sticky = navbar.offsetTop;

function isScrolledIntoView(elem) {
  if (window.pageYOffset >= sticky) {
	  if(!$('#topNavMenu').hasClass('fixed')){
			$('#topNavMenu').addClass('fixed');
			$('#topNavMenu').hide();
			$('#topNavMenu').slideDown(10);
			$('#topNavHasher').addClass('activated');
		}
  } else {
	  
		$('#topNavMenu').removeClass('fixed');
		$('#topNavHasher').removeClass('activated');
  }
}



function refresh_schedule_page(){
	setTimeout( function(){
		get_schedule_page();
		refresh_schedule_page();
	}, 5000);
}

function get_schedule_page(){
	var entity = $('#sched_dyn_canv').data('entity');
	var entityid = $('#sched_dyn_canv').data('entityid');
	var rt = $('#global_data').data('rt');
	$.ajax({
		type: "GET",
		url: rt+'/schedulecanv.php', 
		dataType: 'html',
		data : {
		'entity': entity,
		'entityid': entityid
		},
		success: function(data) {
			$('#sched_dyn_canv').html(data);
		},
		error : function(error) {
			//error
		}
	});
}

function nav_schedule(task){
	var entity = $('#sched_dyn_canv').data('entity');
	var entityid = $('#sched_dyn_canv').data('entityid');
	var rt = $('#global_data').data('rt');
	if(task == 'Next' || task == 'Prev'){
		$.ajax({
			type: "GET",
			url: rt+'/schedulecanv', 
			dataType: 'html',
			data : {
			'task': task,
			'entity': entity,
			'entityid': entityid
			},
			success: function(data) {
				$('#sched_dyn_canv').html(data);

				$(".schedule_over_content").hide(0);
				$(".schedule_over_content").show(1000);
				return true;
			},
			error : function(error) {
				nav_schedule(task);
			}
		});
	}
}


// Schedule
	
function sched_md_trigger(el){
	var entity = $(el).data('entity');
	var date = $(el).data('date');
	var start_time = $(el).data('starttime');
	var end_time = $(el).data('endtime');
	var speaker = $(el).data('speaker');
	var title = $(el).data('title');
	var description = $(el).data('description');
	
	$('.sched_modal h3').html(entity+' ( '+start_time+' - '+end_time+' )');
	$('.sched_modal .time').html(date+', '+start_time+' - '+end_time);
	$('.sched_modal .title').html(title);
	$('.sched_modal .speaker').html(speaker);
	$('.sched_modal .description').html(description);
				
	$('.sched_modal').addClass('md-show' );
}

/* Change URL*/

function changeUrl(title, url) {
    if (typeof (history.pushState) != "undefined") {
        var obj = { Title: title, Url: url };
        history.pushState(obj, obj.Title, obj.Url);
		//$("#mixTitle").data('title',title);
    } else {
        alert("Browser does not support HTML5.");
    }
}




/*Load Img With progress bar*/

	
(function() {
  (function($) {
    return $.fn.imgPreload = function(options) {
      var delay_completion, i, image_stack, placeholder_stack, replace, settings, spinner_stack, src, x, _i, _len;
      settings = {
        fake_delay: 5,
        animation_duration: 10,
		spinner_src: ''
		//spinner_src: 'IMG/choke-8.jpg'
      };
      if (options) {
        $.extend(settings, options);
      }
      image_stack = [];
      placeholder_stack = [];
      spinner_stack = [];
      window.delay_completed = false;
      delay_completion = function() {
        var x, _i, _len, _results;
        window.delay_completed = true;
        _results = [];
        for (_i = 0, _len = image_stack.length; _i < _len; _i++) {
          x = image_stack[_i];
          _results.push($(x).attr('data-load-after-delay') === 'true' ? (replace(x), $(x).removeAttr('data-load-after-delay')) : void 0);
        }
        return _results;
      };
      setTimeout(delay_completion, settings.fake_delay);
      this.each(function() {
        var $image, $placeholder, $spinner_img, offset_left, offset_top;
        $image = $(this);
        offset_top = $image.offset().top;
        offset_left = $image.offset().left;
        $spinner_img = $('<img>');
        $placeholder = $('<img>').attr({
          src: 'data:image/gif;base64,R0lGODlhAQABA\
                IABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
        });
        $placeholder.attr({
          width: $image.attr('width')
        });
        $placeholder.attr({
          height: $image.attr('height')
        });
        spinner_stack.push($spinner_img);
        placeholder_stack.push($placeholder);
        image_stack.push($image.replaceWith($placeholder));
        $('body').append($spinner_img);
        $spinner_img.css({
          position: 'absolute'
        });
        $spinner_img.css('z-index', 9999);
        $spinner_img.load(function() {
          $(this).css({
            left: (offset_left + $placeholder.width() / 2) - $(this).width() / 2
          });
          return $(this).css({
            top: (offset_top + $placeholder.height() / 2) - $(this).height() / 2
          });
        });
        return $spinner_img.attr({
          src: settings.spinner_src
        });
      });
      i = 0;
      for (_i = 0, _len = image_stack.length; _i < _len; _i++) {
        x = image_stack[_i];
        x.attr({
          no: i++
        });
        src = x.attr('src');
        x.attr({
          src: ''
        });
        x.load(function() {
          if (window.delay_completed) {
            return replace(this);
          } else {
            return $(this).attr('data-load-after-delay', true);
          }
        });
        x.attr({
          src: src
        });
      }
      replace = function(image) {
        var $image, no_;
        $image = $(image);
        no_ = $image.attr('no');
        placeholder_stack[no_].replaceWith($image);
        spinner_stack[no_].fadeOut(settings.animation_duration / 2, function() {
          return $(this).remove();
        });
        return $image.fadeOut(0).fadeIn(settings.animation_duration);
      };
      return this;
    };
  })(jQuery);
}).call(this);



/* TICKET*/

var speed = 5000;
canTick = true;

$(document).ready(function() {
	$('.ticker-container ul div').each(function(i) {
		if ($(window).width() >= 500) {
			$(this).find('li').width($(window).width() - parseInt($(this).css('left')));
		}
		if (i == 0) {
			$(this).addClass('ticker-active');
		} else {
			$(this).addClass('not-active');
		}
		if ($(this).find('li').height() > 30) {
			$(this).find('li').css({
				'height': '20px',
				'width': '200%',
				'text-align': 'left',
				'padding-left': '5px'
			});
			$(this).find('li').css('width', $(this).find('li span').width());
		}
	});
	startTicker();
	animateTickerElementHorz();
});

$(window).resize(function() {
	$('.ticker-container ul div').each(function(i) {
		if ($(this).find('li').height() > 30) {
			$(this).css({
				'height': '20px',
				'width': '200%',
				'text-align': 'left',
				'padding-left': '5px'
			});
			$(this).find('li').css('width', $(this).find('li span').width());
		}
	});
});

function startTicker() {
	setInterval(function() {
		if (canTick) {
			$('.ticker-container ul div.ticker-active')
				.removeClass('ticker-active')
				.addClass('remove');
			if ($('.ticker-container ul div.remove').next().length) {
				$('.ticker-container ul div.remove')
					.next()
					.addClass('next');
			} else {
				$('.ticker-container ul div')
					.first()
					.addClass('next');
			}
			$('.ticker-container ul div.next')
				.removeClass('not-active next')
				.addClass('ticker-active');
			setTimeout(function() {
				$('.ticker-container ul div.remove')
					.css('transition', '0s ease-in-out')
					.removeClass('remove')
					.addClass('not-active finished');
				if ($(window).width() < 500) {
					if ($('.ticker-container ul div.finished li').width() < $(window).width()) {
						$('.ticker-container ul div.finished').removeClass('finished');
					}
				} else {
					if ($('.ticker-container ul div.finished li').width() < ($(window).width() - (parseInt($('.ticker-container ul div.ticker-active').css('left')) + 15))) {
						$('.ticker-container ul div.finished').removeClass('finished');
					}
				}
				setTimeout(function() {
					$('.ticker-container ul div')
						.css('transition', '0.25s ease-in-out');
				}, 75);
				animateTickerElementHorz();
			}, 250);
		}
	}, speed);
}

function animateTickerElementHorz() {
	if ($(window).width() < 500) {
		if ($('.ticker-container ul div.ticker-active li').width() > $(window).width()) {
			setTimeout(function() {
				$('.ticker-container ul div.ticker-active li').animate({
					'margin-left': '-' + (($('.ticker-container ul div.ticker-active li').width() - $(window).width()) + 15)
				}, speed - (speed / 5), 'swing', function() {
					setTimeout(function() {
						$('.ticker-container ul div.finished').removeClass('finished').find('li').css('margin-left', 0);
					}, ((speed / 5) / 2)); 
				});
			}, ((speed / 5) / 2));
		}
	} else {
		if ($('.ticker-container ul div.ticker-active li').width() > ($(window).width() - parseInt($('.ticker-container ul div.ticker-active').css('left')))) {
			setTimeout(function() {
				$('.ticker-container ul div.ticker-active li').animate({
					'margin-left': Math.abs($('.ticker-container ul div.ticker-active li').width() - ($(window).width() - parseInt($('.ticker-container ul div.ticker-active').css('left'))) + 15) * -1
				}, speed - (speed / 5), 'swing', function() {
					setTimeout(function() {
						$('.ticker-container ul div.finished').removeClass('finished').find('li').css('margin-left', 0);
					}, ((speed / 5) / 2)); 
				});
			}, ((speed / 5) / 2));
		}
	}
}

$('.ticker-container').on('mouseover', function() {
	canTick = false;
});

$('.ticker-container').on('mouseout', function() {
	canTick = true;
});


/* MODAL EFFECT*/
/**
 * modalEffects.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */

var ModalEffects = (function() {

	function init() {

		var overlay = document.querySelector( '.md-overlay' );

		[].slice.call( document.querySelectorAll( '.md-trigger' ) ).forEach( function( el, i ) {

			var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) ),
				close = modal.querySelector( '.md-close' );

			function removeModal( hasPerspective ) {
				classie.remove( modal, 'md-show' );

				if( hasPerspective ) {
					classie.remove( document.documentElement, 'md-perspective' );
				}
			}

			function removeModalHandler() {
				removeModal( classie.has( el, 'md-setperspective' ) ); 
			}

			el.addEventListener( 'click', function( ev ) {
				classie.add( modal, 'md-show' );
				overlay.removeEventListener( 'click', removeModalHandler );
				overlay.addEventListener( 'click', removeModalHandler );

				if( classie.has( el, 'md-setperspective' ) ) {
					setTimeout( function() {
						classie.add( document.documentElement, 'md-perspective' );
					}, 25 );
				}
			});

			close.addEventListener( 'click', function( ev ) {
				ev.stopPropagation();
				removeModalHandler();
			});

		} );

	}

	init();

})();

/* CLASSIE*/
/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */



( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );
