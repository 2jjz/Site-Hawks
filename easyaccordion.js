/*
 * 	easyAccordion 0.1 - jQuery plugin
 *	written by Andrea Cima Serniotti	
 *	http://www.madeincima.eu
 *
 *	Copyright (c) 2010 Andrea Cima Serniotti (http://www.madeincima.eu)
 *	Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
 *	Built for jQuery library http://jquery.com
 */
 
(function(jQuery) {
	jQuery.fn.easyAccordion = function(options) {
	
	var defaults = {			
		slideNum: false,
		autoStart: false,
		slideInterval: 3000
	};
			
	this.each(function() {
		
		var settings = jQuery.extend(defaults, options);		
		jQuery(this).find('dl').addClass('easy-accordion');
		
		
		// -------- Set the variables ------------------------------------------------------------------------------
		
		jQuery.fn.setVariables = function() {
			dlWidth = jQuery(this).width();
			dlHeight = jQuery(this).height();
			dtWidth = jQuery(this).find('dt').outerHeight();
			if (document.all){dtWidth = 46;}
			//if (jQuery.browser.msie){ /*dtWidth = $(this).find('dt').outerWidth();*/ dtWidth = 46;}
			dtHeight = dlHeight - (jQuery(this).find('dt').outerWidth()-jQuery(this).find('dt').width());
			slideTotal = jQuery(this).find('dt').size();
			ddWidth = dlWidth - (dtWidth*slideTotal) - (jQuery(this).find('dd').outerWidth(true)-jQuery(this).find('dd').width());
			ddHeight = dlHeight - (jQuery(this).find('dd').outerHeight(true)-jQuery(this).find('dd').height());
			
		};
		jQuery(this).setVariables();
		//	console.log(dtWidth);
		
		// -------- Fix some weird cross-browser issues due to the CSS rotation -------------------------------------
    	
		var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0, 
			isChrome  = !!window.chrome && !isOpera, // Chrome 1+ 
			isFirefox = typeof InstallTrigger !== 'undefined', // Firefox 1.0+ 
			isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0; // At least Safari 3+: "[object HTMLElementConstructor]" 

		if(isChrome){ /*console.log('chrome');*/ var dtTop = (dlHeight-dtWidth)/2; var dtOffset = -dtTop;  /*  Chrome */ }
		if (isSafari){ /*console.log('saf');*/ var dtTop = (dlHeight-dtWidth)/2; var dtOffset = -dtTop;  /* Safari */ }
		if (isFirefox){ var dtTop = dlHeight - 20; var dtOffset = - 20; /* FF */ }
		if (document.all){ var dtTop = 0; var dtOffset = 0; /* IE */ }  // this has no effect on IE11
		//if ($.browser.version >= 10.0)
		if (document.all && window.atob){
                dtWidth = 46;
                $('.easy-accordion dt').css('-ms-transform', 'rotate(-90deg)');
                $('.easy-accordion dt').css('-ms-transform-origin', '123px 122px');

                 ddWidth = dlWidth - (dtWidth*slideTotal) - ($(this).find('dd').outerWidth(true)-$(this).find('dd').width());
            }
        // targetting IE11 
        if (navigator.userAgent.indexOf("Trident/7")!=-1){
        	
                var dtTop = 0;
                 var dtOffset = 0;
                $('.easy-accordion dt').css('-ms-transform', 'rotate(-90deg)');
                $('.easy-accordion dt').css('-ms-transform-origin', '123px 122px');
                ddWidth = dlWidth - (dtWidth*slideTotal) - ($(this).find('dd').outerWidth(true)-$(this).find('dd').width());
            }
		
		// -------- Getting things ready ------------------------------------------------------------------------------
		
		var f = 1;
		jQuery(this).find('dt').each(function(){
			jQuery(this).css({'width':dtHeight,'top':dtTop,'margin-left':dtOffset});	
			if(settings.slideNum == true){
				//jQuery('<span class="slide-number">'+0+f+'</span>').appendTo(this);
				jQuery('<div class="eanum'+f+'" />').appendTo(this);  // using graphics rather than text for the numbers
			}
			f = f + 1;
		});
		
		if(jQuery(this).find('.active').size()) { 
			jQuery(this).find('.active').next('dd').addClass('active');
			

			
		} else {
			jQuery(this).find('dt:first').addClass('active').next('dd').addClass('active');
			
			
		}
		
		jQuery(this).find('dt:first').css({'left':'0'}).next().css({'left':dtWidth});
		jQuery(this).find('dd').css({'width':ddWidth,'height':ddHeight});	
	
	
		
		// -------- Functions ------------------------------------------------------------------------------
		
		jQuery.fn.findActiveSlide = function() {
				var i = 1;
				this.find('dt').each(function(){
				if(jQuery(this).hasClass('active')){
					activeID = i; // Active slide
					jQuery(this).find('.eanum'+i+'').removeClass('eanum'+i+'').addClass('eanumactive'+i+'');
					
			
				} else if (jQuery(this).hasClass('no-more-active')){
					noMoreActiveID = i; // No more active slide
					
			jQuery(this).find('.eanumactive'+i+'').removeClass('eanumactive'+i+'').addClass('eanum'+i+'');
			
				}
				i = i + 1;
			});
		};
			
		jQuery.fn.calculateSlidePos = function() {
			var u = 2;
			jQuery(this).find('dt').not(':first').each(function(){	
				var activeDtPos = dtWidth*activeID;
			//	console.log(dtWidth);
			//	console.log(activeDtPos);
				if(u <= activeID){
					var leftDtPos = dtWidth*(u-1);
					jQuery(this).animate({'left': leftDtPos});
					if(u < activeID){ // If the item sits to the left of the active element
						jQuery(this).next().css({'left':leftDtPos+dtWidth});	
					} else{ // If the item is the active one
						jQuery(this).next().animate({'left':activeDtPos});
					}
				} else {
					var rightDtPos = dlWidth-(dtWidth*(slideTotal-u+1));
					jQuery(this).animate({'left': rightDtPos});
					var rightDdPos = rightDtPos+dtWidth;
					jQuery(this).next().animate({'left':rightDdPos});	
				}
				u = u+ 1;
			});
			setTimeout( function() {
				jQuery('.easy-accordion').find('dd').not('.active').each(function(){ 
					jQuery(this).css({'display':'none'});
				});
			}, 400);
			
		};
	
		jQuery.fn.activateSlide = function() {
			this.parent('dl').setVariables();	
			this.parent('dl').find('dd').css({'display':'block'});
			this.parent('dl').find('dd.plus').removeClass('plus');
			this.parent('dl').find('.no-more-active').removeClass('no-more-active');
			this.parent('dl').find('.active').removeClass('active').addClass('no-more-active');
			this.addClass('active').next().addClass('active');	
			this.parent('dl').findActiveSlide();
			if (typeof noMoreActiveID != "undefined") {
				var noMoreActiveID = 0;
			};
			if(activeID < noMoreActiveID){
				this.parent('dl').find('dd.no-more-active').addClass('plus');
			}
			this.parent('dl').calculateSlidePos();	
		};
	
		jQuery.fn.rotateSlides = function(slideInterval, timerInstance) {
			var accordianInstance = jQuery(this);
			timerInstance.value = setTimeout(function(){accordianInstance.rotateSlides(slideInterval, timerInstance);}, slideInterval);
			jQuery(this).findActiveSlide();
			var totalSlides = jQuery(this).find('dt').size();
			var activeSlide = activeID;
			var newSlide = activeSlide + 1;
			if (newSlide > totalSlides) newSlide = 1;
			jQuery(this).find('dt:eq(' + (newSlide-1) + ')').activateSlide(); // activate the new slide
		}


		// -------- Let's do it! ------------------------------------------------------------------------------
		
		function trackerObject() {this.value = null}
		var timerInstance = new trackerObject();
		
		jQuery(this).findActiveSlide();
		jQuery(this).calculateSlidePos();
		
		if (settings.autoStart == true){
			var accordianInstance = jQuery(this);
			var interval = parseInt(settings.slideInterval);
			timerInstance.value = setTimeout(function(){
				accordianInstance.rotateSlides(interval, timerInstance);
				}, interval);
		} 

		jQuery(this).find('dt').not('active').click(function(){		
			jQuery(this).activateSlide();
			clearTimeout(timerInstance.value);
		});	
				
		if (document.all && !window.XMLHttpRequest || !document.all )
		//if (!(jQuery.browser.msie && jQuery.browser.version == 6.0))
		{ 
			jQuery('dt').hover(function(){
				jQuery(this).addClass('hover');
			}, function(){
				jQuery(this).removeClass('hover');
			});
		}
	});
	};
})(jQuery);