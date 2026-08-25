$(document).ready(function() {

  function delay(n) {
    n = n || 1700;
    return new Promise((done) => {
      setTimeout(() => {
        done();
      }, n);
    
     
    });
    }


  barba.init({ 
    transitions: [
      {
        async leave() {
          const done = this.async();
          gsap.to(".tavonline-overlay", { duration: 1, width:'104%', ease: "Expo.easeInOut" }); 
          gsap.to("main", { duration: 1.5, x: '-100%', ease: "Expo.easeInOut" }); 
          
          await delay(1000);
          done();
        },
  
        async enter() {    
         $('main').imagesLoaded( function() {   
          gsap.set("header", {delay: .3, clearProps:"all" });
          gsap.from("main", { duration: 1.5, delay:.2, x: '30%',  clearProps:"all", ease: "Expo.easeInOut" }); 
         gsap.to(".tavonline-overlay", { duration: 1,  width:'0%',   'right' : 'auto', 'left' : '0',   ease: "Expo.easeInOut",  delay: .5,  onComplete: function() { trigger(); }  });
          gsap.set(".tavonline-overlay", {delay: 2, clearProps:"all" });
          let triggers = ScrollTrigger.getAll();
          triggers.forEach( trigger => {      
            trigger.kill();
          });
         ajaxLoad();
         }); 
           scrollbar.scrollTo(0, 0);
        },
      },
    ],
    });

    if($(window).width() < 1024 ){
      $(window).resize(function() {
        if($(window).width() > 1024 ){
        location.reload();
      }
    });
     }




/*----------------------------------------------------*/
/*	PRELOADER
/*----------------------------------------------------*/

function preloader(){

  var progressBar = $(".progress");
  var percentageText = $(".percentage");

  var tl = gsap.timeline({
    onComplete: function() {
      trigger();
    }
  });

  tl.to(progressBar, { height: "100%", duration: 2.5, delay:1, ease: "power1.out" })
    .to(percentageText, { text: "100%", duration: 2 }, "-=2")
    .to("#preloader", {y:'-101%', display: "none", duration: 1,  ease: "Expo.easeInOut" }, "+=0.5");
  
  var count = { value: 0 };
  gsap.to(count, {
    value: 100,
    duration: 2.5,
    onUpdate: function() {
      percentageText.text(Math.round(count.value) + "%");
    },
    delay: 1
  });
	
}

preloader();



/*----------------------------------------------------*/
/*	SMOOTH SCROLL
/*----------------------------------------------------*/
if ($("body").hasClass("smooth-scroll")) {
    var elem = document.querySelector("#content-scroll");
    var scrollbar = Scrollbar.init(elem,
    {
        renderByPixels: true,
        damping:0.1
    });

}

scrollbar.setPosition(0, 0);
scrollbar.track.xAxis.element.remove();

ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    if (arguments.length) {
        scrollbar.scrollTop = value;
    }
    return scrollbar.scrollTop;
  }
});

scrollbar.addListener(ScrollTrigger.update);



function ajaxLoad(){
  splitText();
  perspective();
  crossSlider();
  rollSlider();
  accordionSlider();
  letter_slider();
  gridProjects();
  fullscreenSlider();
  accordion();
  commentSlider();
  counter();
  news();
  header();
  cursorMoveFunc();
  LineWebgl();
  lightbox();
  if( jQuery('#map').length ){
    contactmap();
  }
}

ajaxLoad();



/*----------------------------------------------------*/
/*	FULLPAGE SLIDER
/*----------------------------------------------------*/

function fullscreenSlider(){
	
  interleaveOffset = 0.5;
	var titles = [];
	var subheading = [];
  var sliderSpeed = $('.fullscreen-slider').data('autoplay');

  var video = $('.fullscreen-showcase .swiper-slide:eq(0)').find('video').get(0);
  if(video){
    video.play();
  }

  $('.fullscreen-slider .swiper-slide').each(function(i) {
		titles.push($(this).data('title'));
		subheading.push($(this).data('subheading'))
	});

  $('.fullscreen-slider .swiper-slide').each(function(index){
    thisIndex = $(this).index() +1;
    $('.slide-numbers').append('<span> 0'+ thisIndex  +'</span>')
  });

  var totalSlidefull = $('.fullscreen-slider .swiper-slide').length;
  var fulltotalSlideUp = totalSlidefull > 9 ? totalSlidefull : '0' + totalSlidefull;
  $('.fullscreen-slider .total-slide').text(fulltotalSlideUp);

  var sliderProgressPlay = gsap.timeline({yoyo: false,reversed: true});
  sliderProgressPlay.pause();
  sliderProgressPlay.to($('.fullscreen-showcase .progress-bar span'), { 'width': '100%', duration:sliderSpeed, clearProps: 'all' });


  var swiperfull = new Swiper(".fullscreen-slider", {
	  direction: "horizontal",
	  loop: false,
	  grabCursor: false,
	  resistance : true,
	  resistanceRatio:0.5,
	  slidesPerView: 1,
	  allowTouchMove:false,  
    mousewheel: true,
	  speed:1200,
    navigation: {
      prevEl: '.fullscreen-slider .slider-arrows .prev',
      nextEl: '.fullscreen-slider .slider-arrows .next'
    },
    autoplay: {
      delay: sliderSpeed * 1000,
      disableOnInteraction: false,
    },
        pagination: {
          el: '.slider-content .text-wrap',
          clickable: false,
          renderBullet: function (index, className) {
            return '<div class="' + className + '">' +  '<div class="subheading">' + subheading[index] + '</div>' + '<h3 class="title">'  + titles[index] + '</h3>' + '</div>';
             
          },
        },		
	  on: {
      init	: function(){
        sliderProgressPlay.play();
        var sourceHref = $(".fullscreen-showcase .swiper-slide-active").attr("href");
        $(".fullscreen-content-holder .take-look").attr("href", sourceHref);
      },
      slideChangeTransitionEnd	: function(){
        sliderProgressPlay.restart();
      },
      slideChangeTransitionStart: function () {
        sliderProgressPlay.kill();
        var sourceHref = $(".fullscreen-showcase .swiper-slide-active").attr("href");
        $(".fullscreen-content-holder .take-look").attr("href", sourceHref);
      },
		  progress: function(){
			  var swiper = this;
			  for (var i = 0; i < swiper.slides.length; i++) {
				var slideProgress = swiper.slides[i].progress,
					innerOffset = swiper.width * interleaveOffset,
					innerTranslate = slideProgress * innerOffset;
				swiper.slides[i].querySelector(".image").style.transform =
				  "translate3d(" + innerTranslate + "px, 0, 0)";
			  }
			},
			touchStart: function() {
			  var swiper = this;
			  for (var i = 0; i < swiper.slides.length; i++) {
				swiper.slides[i].style.transition = "";
			  }
			},
		  setTransition: function(speed) {
			  var swiper = this;
			  for (var i = 0; i < swiper.slides.length; i++) {
				  swiper.slides[i].style.transition = speed + "ms";
				  swiper.slides[i].querySelector(".image").style.transition = speed + "ms";
			  }   
		   }, 
       slideNextTransitionStart: function () {	
			  var prevslidecontent = new TimelineLite();
			  prevslidecontent.staggerTo($('.swiper-pagination-bullet-active').prev().find('.subheading'), 0.3, {y:-60, opacity:0, delay:0, ease:Power2.easeIn})
			  var prevslidetitle = new TimelineLite();						
			  prevslidetitle.staggerTo($('.swiper-pagination-bullet-active').prev().find('.title'), 0.4, {y:-60, opacity:0, delay:0.1, ease:Power2.easeInOut})
			  var activeslidecontent = new TimelineLite();
			  activeslidecontent.staggerTo($('.swiper-pagination-bullet-active').find('.subheading'), 0.5, {y:0, opacity:1, scale:1, delay:0.5, ease:Power2.easeOut})
			  var activeslidetitle = new TimelineLite();												
			  activeslidetitle.staggerTo($('.swiper-pagination-bullet-active').find('.title'), 0.5, {y:0, opacity:1, scale:1, delay:0.6, ease:Power2.easeOut})
													  
			  var nextslidecontent = new TimelineLite();	
			  nextslidecontent.staggerTo($('.swiper-pagination-bullet-active').next().find('.subheading'), 0.3, {y:60, opacity:0, delay:0, ease:Power2.easeIn})		
			  var nextslidetitle = new TimelineLite();						
			  nextslidetitle.staggerTo($('.swiper-pagination-bullet-active').next().find('.title'), 0.5, {y:60, opacity:0, ease:Power2.easeInOut})
			  
			  var tl = new TimelineLite();
			  
			  $('.swiper-pagination-bullet-active').prev().find('.counter').each(function(index, element) {
				  tl.to(element, 0.3, {scale:1, y:-20, opacity:0, ease:Power2.easeIn}, index * 0.01)
			  });
			  
			  $('.swiper-pagination-bullet-active').find('.counter').each(function(index, element) {
				  tl.to(element, 0.4, {scale:1, y:0, opacity:1, scale:1, delay:0.3, ease:Power2.easeOut}, index * 0.01)
			  });
			  
			  $('.swiper-pagination-bullet-active').next().find('.counter').each(function(index, element) {
				  tl.to(element, 0.3, {scale:1, y:20, opacity:0, ease:Power2.easeIn}, index * 0.01)
			  });		
        			
        gsap.to( $('.slide-numbers span'),{ 
          y: '+=-100%', 
        });	
			  
		  },
		  slidePrevTransitionStart: function () {							
			  var prevslidecontent = new TimelineLite();
			  prevslidecontent.staggerTo($('.swiper-pagination-bullet-active').prev().find('.subheading'), 0.3, {y:-60, opacity:0, delay:0, ease:Power2.easeIn})
			  var prevslidetitle = new TimelineLite();						
			  prevslidetitle.staggerTo($('.swiper-pagination-bullet-active').prev().find('.title'), 0.4, {y:-60, opacity:0, delay:0, ease:Power2.easeInOut})
									  
			  
			  var activeslidecontent = new TimelineLite();
			  activeslidecontent.staggerTo($('.swiper-pagination-bullet-active').find('.subheading'), 0.5, {y:0, opacity:1, scale:1, delay:0.5, ease:Power2.easeOut})
			  var activeslidetitle = new TimelineLite();												
			  activeslidetitle.staggerTo($('.swiper-pagination-bullet-active').find('.title'), 0.5, {y:0, opacity:1, scale:1, delay:0.4, ease:Power2.easeOut})
													  
			  
			  var nextslidecontent = new TimelineLite();	
			  nextslidecontent.staggerTo($('.swiper-pagination-bullet-active').next().find('.subheading'), 0.3, {y:60, opacity:0, delay:0.1, ease:Power2.easeIn})		
			  var nextslidetitle = new TimelineLite();						
			  nextslidetitle.staggerTo($('.swiper-pagination-bullet-active').next().find('.title'), 0.5, {y:60, opacity:0, delay:0, ease:Power2.easeInOut})
			  
			  var tl = new TimelineLite();
			  
			  $('.swiper-pagination-bullet-active').prev().find('.counter').each(function(index, element) {
				  tl.to(element, 0.3, {scale:1, y:-20, opacity:0, delay:0.1,  ease:Power2.easeIn}, index * 0.01)
			  });
			  
			  $('.swiper-pagination-bullet-active').find('.counter').each(function(index, element) {
				  tl.to(element, 0.4, {scale:1, y:0, opacity:1, scale:1, delay:0.45, ease:Power2.easeOut}, index * 0.01)
			  });
			  
			  $('.swiper-pagination-bullet-active').next().find('.counter').each(function(index, element) {
				  tl.to(element, 0.3, {scale:1, y:20, opacity:0, delay:0.1,  ease:Power2.easeIn}, index * 0.01)
			  });					
			  
        gsap.to( $('.slide-numbers span'),{ 
          y: '+=+100%', 
        });
		  },
      
		  reachBeginning: function () {						
			  var prevslidecontent = new TimelineLite();
			  prevslidecontent.staggerTo($('.swiper-pagination-bullet:last-child').find('.subheading'), 0.3, {y:-60, opacity:0, delay:0, ease:Power2.easeIn})
			  var prevslidetitle = new TimelineLite();						
			  prevslidetitle.staggerTo($('.swiper-pagination-bullet:last-child').find('.title'), 0.4, {y:-60, opacity:0, delay:0, ease:Power2.easeInOut})		
			  
        setTimeout(() => {
          gsap.to( $('.slide-numbers span'),{ 
            y: '0', 
            clearProps: 'all',
          });
        }, 250);
		  },
      slideChange: function () {

        var swiper = this; // 
        $('.fullscreen-showcase .swiper-slide video').each(function () {
          var video = $(this).get(0);
          if (video) {
            if ($(this).parents('.swiper-slide').index() === swiperfull.realIndex) {
              video.play(); 
            } else {
              video.pause(); 
            }
          }
        });
      },
	  },
  });
}




/*----------------------------------------------------*/
/*	SPLITTEXT
/*----------------------------------------------------*/
function splitText(){
    
  splitLines = new SplitText(".perspective-slider .slide .slider-content h1", {
    type: "chars",
    charsClass: "char"
  });

  splitLines = new SplitText(".text-anime", {
    type: "lines",
    linesClass: "text-lines"
  });


  

  $(".text-anime .text-lines").wrap('<div class="line-wrapper">');

}


/*----------------------------------------------------*/
/* MAGNIFIC POPUP  
/*----------------------------------------------------*/
  
function lightbox() {
  if( $('.lightbox').length ){
    $('.lightbox').attr('data-barba-prevent', 'all');
    $('.lightbox').magnificPopup({
          type:'image',
          gallery:{enabled:true},
          zoom:{enabled: true, duration: 300}
      });
  }
}

/*----------------------------------------------------*/
/*	PERSPECTIVE SLIDER
/*----------------------------------------------------*/

function perspective(){

  if($('.perspective-slider').length){

gsap.set('.perspective-slider .slide', { perspective: 60});

$('.perspective-slider .slide .image').each(function(){
  var slide = $(this);
  var video = slide.find('video').get(0);
  
  gsap.fromTo( this,{ 
      rotationX:1.8,
      scaleX:.95,
      z:'0vh'}, {
          rotationX:-.5,
          scaleX:.9,
          z:'-2vh',
      scrollTrigger: {
          trigger: slide,
          start: "top+=150px bottom",
          end: "bottom top",
          immediateRender: false,
          scrub: 0.1,
          onEnter: () => {
              if (video) {
                  video.play();
              }
          },
          onLeave: () => {
              if (video) {
                  video.pause();
              }
          },
          onEnterBack: () => {
              if (video) {
                  video.play();
              }
          },
          onLeaveBack: () => {
              if (video) {
                  video.pause();
              }
          },
          //markers: true,
      }
  });
});

$('.perspective-slider .slide .slider-content h1').each(function(){
    gsap.from( $(this).find('.char'),{ 
        autoAlpha:0,
        stagger:.03,
        rotateY: 100,
        y:-100,
        scrollTrigger: {
            trigger: $(this),
            start: "top bottom-=10%",
            end: "top top-=20%",
            toggleActions: "play reverse play reverse",
          }
    });
});

$('.perspective-slider .slide .slider-content .category').each(function(){
  gsap.from( $(this),{ 
      autoAlpha:0,
      x:50,
      y:30,
      scrollTrigger: {
          trigger: $(this),
          start: "top bottom-=10%",
          end: "top top-=20%",
          toggleActions: "play reverse play reverse",
        }
  });
});

$('.perspective-slider .slide .slider-content .load-button').each(function(){
  gsap.from( $(this),{ 
      autoAlpha:0,
      x:50,
      y:30,
      scrollTrigger: {
          trigger: $(this),
          start: "top bottom-=10%",
          end: "top top-=20%",
          toggleActions: "play reverse play reverse",
        }
  });
});

$('.perspective-slider .slide .slider-content').each(function(){
  gsap.from( $(this),{ 
    yPercent: -100,
      scrollTrigger: {
          trigger: $(this).closest('.image'),
          start: "top bottom-=10%",
          end: "top 100px",
          scrub: true
        }
  });
});

//WORKS NUMBERS

var totalSlide = $('.perspective-slider .slide').length;

var totalSlideUp = totalSlide > 9 ? totalSlide : '0' + totalSlide;

$('.pers-bottom .total-slide').text(totalSlideUp);

$('.perspective-slider .slide').each(function(index){
  thisIndex = $(this).index() +1;
  $('.slide-numbers').append('<span> 0'+ thisIndex  +'</span>')
});


$('.perspective-slider .slide').each(function(){

  gsap.to( $('.slide-numbers span'),{ 
    y: '+=-100%',  duration:.1,     
      scrollTrigger: {
          trigger: $(this),
          start: "top bottom",
          end: "center-=10% bottom",
          immediateRender: false,
          toggleActions: "pause play reverse none",
        }
  });
});
    
}
  
}
/*----------------------------------------------------------------------*/
/*   LETTER SLIDER
/*----------------------------------------------------------------------*/

function letter_slider() {
  if ($('#letter-slider').length) {

  $('html').addClass('showcase');

  $('html').addClass('showcase');
  var lnx = $('.swiper-slide .slide-content .title');
  for (let i = 0; i < lnx.length; i++) {
    var txt = lnx[i].textContent.charAt(0);
    $('.bullets ul').append('<li data-dist="1"> <span>' + txt + '\n' + '</span></li>');
  }

  $('.bullets ul li:first-child, .slider-images ul li:first-child').addClass('focus');


  var video = $('#letter-slider .focus').find('video').get(0);
  if(video){
    video.play();
  }

  var swiper = new Swiper('.swiper-container', {
    speed: 1000,
    direction: 'vertical',
    slidesPerView: 'auto',
    simulateTouch: false,
    resistance : true,
    resistanceRatio : 0.1,
    mousewheel: {
      sensitivity: 3,
      thresholdDelta: 10,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    on: {
      slideChange: function () {
        var aktifindex = swiper.activeIndex;
        var coord = aktifindex * - 75;
        $('.bullets ul li, .slider-images ul li').removeClass('focus');
        $('.bullets ul li:eq(' + aktifindex + '), .slider-images ul li:eq(' + aktifindex + ')').addClass('focus');
                $('.bullets ul').css('margin-top', coord);

                $('.slider-images').find('video').each(function() {      
                  this.pause();
                });
                $('.slider-images .focus').find('video').each(function() {      
                  this.play();
                });
                
            },
        },
  });
  $('.bullets ul li').on('click', function () {
    swiper.slideTo($(this).index());
  });
}else{
  $('html').removeClass('showcase');
}


  
}

/*----------------------------------------------------*/
/*	CROSS SLIDER
/*----------------------------------------------------*/

function crossSlider(){

  if ($('.cross-slider').length) {

  if($('.cross-slider').next().length == 0){
    var isWheelEventAllowed = true;
    $('.cross-slider').on('wheel', function(event){
        if (isWheelEventAllowed) {
            if (event.originalEvent.deltaY > 0) {
                // Mouse aşağı kaydırıldı
                $('.cross-nav .prev').trigger('click');
            } else if (event.originalEvent.deltaY < 0) {
                // Mouse yukarı kaydırıldı
                $('.cross-nav .next').trigger('click');
            }
            isWheelEventAllowed = false;
            
            setTimeout(function(){
                isWheelEventAllowed = true;
            }, 1500);
        }
    });

    setTimeout(() => {
      $('html').addClass('showcase');
    }, 250);

  }else{
    setTimeout(() => {
      $('html').removeClass('showcase');
    }, 250);
  }

  $('.cross-slider-base .image').each( function(index){
    if( index <= 2 ){
      $($(this)).clone().appendTo('.cross-slider-images');
    }
  });


  // Captions
  var captionsDiv = $(".cross-slider-captions");

  var allWords = []; 
  var maxWordCount = 0;

  $(".cross-slider-base .image").each(function() {
    var title = $(this).data("title");
    var words = title.split(" ");
    allWords.push(words); 
    if (words.length > maxWordCount) {
      maxWordCount = words.length;
    }
  });

  for (var i = 0; i < maxWordCount; i++) {
    var divGroup = $("<div class='word-group'></div>");

    for (var j = 0; j < allWords.length; j++) {
      var words = allWords[j];

      if (i < words.length) {
        var word = words[i];
        var wordDiv = $("<span>" + word + "</span>");
        divGroup.append(wordDiv);
      } else {
        var emptySpan = $("<span></span>");
        divGroup.append(emptySpan);
      }
    }
    captionsDiv.append(divGroup);
  }

  // create categories
    var workCategoriesDiv = $('<div class="work-categories"></div>');
    $('.cross-slider-captions').before(workCategoriesDiv);
    
    $('.cross-slider .cross-slider-base .image').each(function() {
      var category = $(this).data('category');
      workCategoriesDiv.append('<span>' + category + '</span>');
    });


    function prevSlide() {

      gsap.set($('.cross-nav'), { 'pointer-events': 'none' });
      gsap.set($('.cross-nav'), { 'pointer-events': 'all', delay:.8 });

      var allVideos =  jQuery('.cross-slider .cross-slider-images .image').find('video').get(0);
      if(allVideos){
        allVideos.pause();
      }
      var activeVideo = jQuery('.cross-slider .cross-slider-images .image:nth-child(1)').find('video');

      if(activeVideo){
        jQuery('.cross-slider .cross-slider-images .image:nth-child(1)').find('video').each(function() {
          jQuery(this).get(0).play();
      });
      }
    
      gsap.to($('.cross-slider .cross-slider-images .image:nth-child(1)'), {
        top: '50%',
        left: '50%',
        y: '-50%',
        x: '-50%',
        rotate: '-14deg',
        duration: 1,
        ease: "Power2.easeOut"
      });

      gsap.to($('.cross-slider .cross-slider-images .image:nth-child(2)'), {
        'z-index': '10',
        top: 0,
        y: '-94%',
        x:0,
        left: 'initial',
        right: 0,
        rotate: '14deg',
        xPercent: 0, 
        yPercent: 0, 
        'margin-left': '0%',
        duration: 1,
        clearProps: 'left',
        ease: "Power2.easeOut"
      });

      gsap.to($('.cross-slider .cross-slider-images .image:nth-child(3)'), {
        'z-index': '-1',
        autoAlpha: 0,
        duration:1,
        ease: "Power2.easeOut"
      });
      setTimeout(() => {
        $('.cross-slider .cross-slider-images .image').removeClass('active');
        var $prev = $('.cross-slider .cross-slider-base .image.active').removeClass('active').prev('.image')
        if ($prev.length) {
          $prev.addClass('active');
        }
        else {
          $(".image:last-child").addClass('active');
        }

        var $current = $('.cross-slider .cross-slider-base .image.active').prev('.image')
        if ($current.length) {
          $('.cross-slider .cross-slider-base .image.active').prev('.image').clone().prependTo('.cross-slider-images');
        }
        else {
          $('.cross-slider .cross-slider-base .image:last').clone().prependTo('.cross-slider-images');
        }

        gsap.from($('.cross-slider .cross-slider-images .image:nth-child(1)'), {
          autoAlpha: 0,
          duration: 1,
        });

        // caption anime
        gsap.to($('.cross-slider .cross-slider-captions .word-group span'), {
          y: '+=100%',
          onComplete: function () {
            gsap.delayedCall(0.5, function () {
              $('.cross-slider .cross-slider-captions .word-group').each(function () {

                gsap.set($('.cross-slider .cross-slider-captions .word-group span'), { clearProps: 'all' })

                // move span last order
                var firstSpan = $(this).find('span:last');
                $(this).prepend(firstSpan);
              });
            });
          }
        });

        // categories anime
        gsap.to($('.cross-slider .work-categories span'), {
          y: '+=100%',
          onComplete: function () {
            gsap.delayedCall(0.5, function () {
              $('.cross-slider .work-categories').each(function () {

                gsap.set($('.cross-slider .work-categories span'), { clearProps: 'all' })

                // move span last order
                var firstSpan = $(this).find('span:last');
                $(this).prepend(firstSpan);
              });
            });
          }
        });

        $('.cross-slider-images .image:last-child').remove();
        $('.cross-slider .cross-slider-images .image').removeAttr('style');
      }, 200);
    }

    function nextSlide() {

      gsap.set($('.cross-nav'), { 'pointer-events': 'none' });
      gsap.set($('.cross-nav'), { 'pointer-events': 'all', delay:.8 });

      var allVideos =  jQuery('.cross-slider .cross-slider-images .image').find('video').get(0);
      if(allVideos){
        allVideos.pause();
      }
      var activeVideo = jQuery('.cross-slider .cross-slider-images .image:nth-child(3)').find('video');

      if(activeVideo){
        jQuery('.cross-slider .cross-slider-images .image:nth-child(3)').find('video').each(function() {
          jQuery(this).get(0).play();
      });
      }

      gsap.to($('.cross-slider .cross-slider-images .image:nth-child(1)'), {
        'z-index': '-1',
        autoAlpha: 0,
        duration: 1,
        ease: "Power2.easeOut"
      });

      gsap.to($('.cross-slider .cross-slider-images .image:nth-child(2)'), {
        'z-index': '10',
        top: '100%',
        rotate: '14deg',
        y: '-9%',
        x: '-50%',
        left: '0',
        xPercent: 0, 
        yPercent: 0, 
        duration: 1,
      });
      
      gsap.to($('.cross-slider .cross-slider-images .image:nth-child(3)'), {
        top: '50%',
        left: '50%',
        y: '-50%',
        x: '-50%',
        rotate: '-14deg',
        duration: 1,
        ease: "Power2.easeOut"
      });

      setTimeout(() => {
        $('.cross-slider .cross-slider-images .image').removeClass('active');
        var $next = $('.cross-slider .cross-slider-base .image.active').removeClass('active').next('.image')
        if ($next.length) {
          $next.addClass('active');
        }
        else {
          $(".image:first-child").addClass('active');
        }
        var $current = $('.cross-slider .cross-slider-base .image.active').next('.image');
        if ($current.length) {
          $('.cross-slider .cross-slider-base .image.active').next('.image').clone().appendTo('.cross-slider-images');
        }
        else {
          $('.cross-slider .cross-slider-base .image:first').clone().appendTo('.cross-slider-images');
        }

        gsap.from($('.cross-slider .cross-slider-images .image:nth-child(3)').next(), {
          autoAlpha: 0,
          duration: 1,
        });

        gsap.to($('.cross-slider .cross-slider-captions .word-group span'), {
          y: '+=-100%',
          onComplete: function () {
            gsap.delayedCall(0.5, function () {
              $('.cross-slider .cross-slider-captions .word-group').each(function () {

                gsap.set($('.cross-slider .cross-slider-captions .word-group span'), { clearProps: 'all' })
                // move span last order
                var lastSpan = $(this).find('span:first');
                $(this).append(lastSpan);
              });
            });
          }
        });

      // categories anime
        gsap.to($('.cross-slider .work-categories span'), {
          y: '+=-100%',
          onComplete: function () {
            gsap.delayedCall(0.5, function () {
              $('.cross-slider .work-categories').each(function () {

                gsap.set($('.cross-slider .work-categories span'), { clearProps: 'all' })

                // move span last order
                var lastSpan = $(this).find('span:first');
                $(this).append(lastSpan);
              });
            });
          }
        });

        $('.cross-slider-images .image:first-child').remove();
        $('.cross-slider .cross-slider-images .image').removeAttr('style');
      }, 200);
    }


  // Prev Slide
  $('.cross-nav .prev').on('click', function(){
    prevSlide();
  });


  // next Slide
  $('.cross-nav .next').on('click', function(){
    nextSlide();
  });

  }
}

/*----------------------------------------------------*/
/*	ROLL SLIDER
/*----------------------------------------------------*/

function rollSlider(){

  if($('.roll-slider ').length){


  $('html').addClass('showcase');

    var video = $('.roll-slider-wrap .swiper-slide').find('video').get(0);
    if(video){
      video.play();
      video.pause();
    }

  // Slider Counter
  setTimeout(() => {
    var totalSlide = $('.roll-slider .swiper-slide').length;
    var totalSlideUp = totalSlide > 9 ? totalSlide : '0' + totalSlide;
    $('.total-slide').text(totalSlideUp);

    splitLines = new SplitText(".swiper-pagination-bullet .title h1", {
      type: "chars words",
      charsClass: "char"
    });

    }, 250);

    $('.roll-slider .swiper-slide').each(function(index){
      thisIndex = $(this).index() +1;
      $('.slide-numbers').append('<span> 0'+ thisIndex  +'</span>')
    });

  interleaveOffset = 0.5;
  var titles = [];
  var subheading = [];

  $('.roll-slider .swiper-slide').each(function(i) {
    titles.push($(this).data('title'));
    subheading.push($(this).data('category'))
  });



    var video = $('.roll-slider-wrap .swiper-slide:eq(0)').find('video').get(0);
    if(video){
      video.play();
    }

  var rollSwiper = new Swiper(".mySwiper", {
    speed:1000,
    breakpoints: {
      // when window width is >= 640px
      1024: {
        slidesPerView:4,
        spaceBetween: 0,
      }
    },
    slidesPerView: 2.2,
    loop: false,
    centeredSlides: true,
    resistance : true,
    resistanceRatio : 0.1,
    navigation: false,
    direction: 'vertical',
    mousewheel: {
      sensitivity: 3,
      thresholdDelta: 10,
    },
    simulateTouch: false,
    pagination: {
      el: '.slider-content',
      clickable: false,
      renderBullet: function (index, className) {
        return '<div class="' + className + '">' + '<div class="content-wrap">' + '<div class="subheading">' + subheading[index] + '</div>' + '<div class="title"><h1>'  + titles[index] + '</h1></div></div>' + '</div>';
        
      },
    },
    on: {
      slideChange: function () {

        var swiper = this; // 
        $('.roll-slider-wrap .swiper-slide video').each(function () {
          var video = $(this).get(0);
          if (video) {
            if ($(this).parents('.swiper-slide').index() === rollSwiper.realIndex) {
              video.play(); 
            } else {
              video.pause(); 
            }
          }
        });
      gsap.to( $('.swiper-pagination-bullet-active').prevAll().find('.title h1 .char'),{ 
        autoAlpha:0,
        y:-30,
        stagger:.03,
        rotateY: 100,
    });

    gsap.to( $('.swiper-pagination-bullet-active').nextAll().find('.title h1 .char'),{ 
      autoAlpha:0,
      y: 30,
      stagger:.03,
      rotateY: 100,
    });

      gsap.to( $('.swiper-pagination-bullet-active').nextAll().find('.subheading'),{ 
        autoAlpha:0,
        stagger:.03,
        rotateY: 0,
        y:30,
        x:-20,
    });

    gsap.to( $('.swiper-pagination-bullet-active').prevAll().find('.subheading'),{ 
      autoAlpha:0,
      stagger:.03,
      rotateY: 0,
      y:-30,
      x:-20,
  });

    gsap.to( $('.swiper-pagination-bullet-active').nextAll().find('.load-button'),{ 
      autoAlpha:0,
      x:-30,
  });

  gsap.to( $('.swiper-pagination-bullet-active').prevAll().find('.load-button'),{ 
    autoAlpha:0,
    x:-30,
  });

  // Slider animation
      gsap.to( $('.swiper-pagination-bullet-active .title h1').find('.char'),{ 
        autoAlpha:1,
        stagger:.03,
        rotateY: 0,
        y:0,
        delay:.7,
    });

    gsap.to( $('.swiper-pagination-bullet-active .subheading'),{ 
      autoAlpha:1,
      stagger:.03,
      rotateY: 0,
      x:0,
      y:0,
      delay:.7,
  });

  gsap.to( $('.swiper-pagination-bullet-active').find('.load-button'),{ 
    autoAlpha:1,
    x:0,
    delay:.7,
  });

      },
      slideNextTransitionStart: function () {    
        gsap.to( $('.slide-numbers span'),{ 
        y: '+=-100%', 
      });
      },
      slidePrevTransitionStart	: function () {
        gsap.to( $('.slide-numbers span'),{ 
          y: '+=+100%', 
        });
      },
    }
  });

  // Disable scroll
  $('.go-to-href').on('click', function(){
      var target = this.hash;
    scrollbar.scrollTo(0, $(target).offset().top, 1000)
  });

  function preventScroll(e){
    e.preventDefault();
    e.stopPropagation();

    return false;
  }

}else{
  $('html').removeClass('showcase');
}
}

/*----------------------------------------------------*/
/*	ACCORDION SLIDER
/*----------------------------------------------------*/

function accordionSlider(){

  function accordionOrder(){


    var slides = document.querySelectorAll('.accordion-slider .slide');

      function slidePosition(){
        if(($(window).width()) > 1024){
          for (let i = 1; i < slides.length; i++) {
            var rightValue = 450 - (150 * i);
            slides[i].style.right = `${rightValue}px`;
          }
        }

        if ($(window).width() < 1024 && $(window).width() > 580) {
          for (let i = 1; i < slides.length; i++) {
            var rightValue = 300 - (100 * i);
            slides[i].style.right = `${rightValue}px`;
          }
        }

        if(($(window).width()) < 580){
          for (let i = 1; i < slides.length; i++) {
            var rightValue = 100 - (50 * i);
            slides[i].style.right = `${rightValue}px`;
          }
        }

      }   
      slidePosition();
    $(window).on('resize', function() { 
      slidePosition();
    });

  }

  accordionOrder();


  gsap.set($('.accordion-slider .slide:not(.accordion-slider .slide:first)').find('.slider-caption h2, .slider-caption .category'), { autoAlpha:0 })

  $('.accordion-slider .slide').on('click', function(){
    gsap.set($(this).find('a'), { 'display':'inline-block'})
    gsap.set($('.accordion-slider .slide:not(.accordion-slider .slide:first)').find('.slider-caption h2, .slider-caption .category'), { autoAlpha:0 })
    
    gsap.set($('.accordion-slider .slide'), { 'pointer-events': 'none' })

    $('.accordion-slider').find('video').get(0).pause();
    var video = $(this).find('video').get(0);
    if (video) {
      video.play();
    }

    gsap.set($(this), {'z-index': '2' })

    gsap.to( $(this).prevAll().find('.category') , {delay:.8, clearProps: 'all'})
    gsap.to( $(this).prevAll().find('h2') , {delay:.8, clearProps: 'all'})
    gsap.to( $(this).prevAll().find('.letter') , {delay:.8, clearProps: 'all'})

    gsap.to($(this).find('.letter'), { autoAlpha:0 })
    gsap.to($(this).find('.slider-caption .category'), { autoAlpha:1, x:0, delay:.3, duration:.8})
    gsap.to($(this).find('.slider-caption h2'), { autoAlpha:1, x:0, delay:.5, duration:.8})

    if(($(window).width()) > 1024){
      gsap.to($(this), {'width': 'calc(100vw - 450px)', left: 0 })
    }
    if ($(window).width() < 1024 && $(window).width() > 580) {
      gsap.to($(this), {'width': 'calc(100vw - 300px)', left: 0 })
    }
    if(($(window).width()) < 580){
      gsap.to($(this), {'width': 'calc(100vw - 100px)', left: 0 })
    }

     $(window).on('resize', function() {

      if(($(window).width()) > 1024){
        gsap.to($(this), {'width': 'calc(100vw - 450px)', left: 0 })
      }
      if ($(window).width() < 1024 && $(window).width() > 580) {
        gsap.to($(this), {'width': 'calc(100vw - 300px)', left: 0 })
       }
       if(($(window).width()) < 580){
         gsap.to($(this), {'width': 'calc(100vw - 100px)', left: 0 })
       }
      });
      
    gsap.set($(this).nextAll().find('a'), { 'display':'none'})
    gsap.set($(this).nextAll().find('.overlay'), { clearProps: 'all'})
    gsap.to($(this).find('.overlay'), {autoAlpha:0 })

    if ($(window).width() > 1024) {
      transportAmount =  150;
    } 
    if ($(window).width() < 1024 && $(window).width() > 580) {
      transportAmount = 100;
    }
    if ($(window).width() < 580) {
      transportAmount =  50;
    } 

    $(window).on('resize', function() {

      if ($(window).width() > 1024) {
        transportAmount =  150;
      } 
      if ($(window).width() < 1024 && $(window).width() > 580) {
        transportAmount = 100;
      }
      if ($(window).width() < 580) {
        transportAmount =  50;
      } 
    });
    
  
    gsap.to($(this).nextAll(), { right: '+=' +  $(this).index() * transportAmount + 'px' });


  gsap.to($('.accordion-slider .slide'), {delay:.8, clearProps: 'transform'})

  setTimeout(() => {
    $(this).prevAll().removeAttr('style');
    $(this).prevAll().appendTo('.accordion-slider');
    accordionOrder();
      gsap.set($('.accordion-slider .slide'), { 'pointer-events': 'all' })
  }, 1000);

  });

  var swiper = new Swiper(".client-slider", {
    // Optional parameters
    slidesPerView: 1.7,
    spaceBetween: 0,
    centeredSlides: true,
    speed: 2500,
    autoplay: {
      delay: 0,
    },
    loop: true,
    allowTouchMove: false,
    disableOnInteraction: true,
  });

  
}



/*----------------------------------------------------*/
/*	GRID PROJECTS
/*----------------------------------------------------*/


function gridProjects(){
  if ($('.grid-works-wrap').length) {


    $('.grid-works-wrap').masonry({
      // options
      itemSelector: '.grid-work',
      columnWidth: '.grid-work'
    });
  
  
    $('.grid-work').each(function() {
      var leftPosition = $(this).css('left');
      if (leftPosition === '0px') {
        $(this).addClass('left-item');
      }
    });

    if($('.grid-works-wrap').hasClass('fast-right-items') && $(window).width() > 767){
      scrollbar.addListener(function (status) {
        var scrollY = status.offset.y;
        var translateY = scrollY / 6;
          gsap.to($('.grid-work').not('.grid-work.left-item'), { y: translateY + 'px', duration:.1 })
    });
    }else if( $('.grid-works-wrap').hasClass('fast-left-items')){
      scrollbar.addListener(function (status) {
        var scrollY = status.offset.y;
        var translateY = scrollY / 6;
          gsap.to($('.grid-work.left-item'), { y: translateY + 'px', duration:.1 })
    });
    }

    if($(window).width() > 1024 ){
          $(window).resize(function() {
              if($(window).width() < 1024 ){
              location.reload();
          }
        });
     }
  
  
    $('.grid-video').each(function(){
      ScrollTrigger.create({
              trigger: $(this),
              start: "top bottom-=10%",
              end: "center 100px",
              onEnter: () =>  {
                jQuery(this).find('video').get(0).play()
              },
              onLeave: () =>  {
                jQuery(this).find('video').get(0).pause()
              },
              onEnterBack: () =>  {
                jQuery(this).find('video').get(0).play()
              },
            });
    });
    
    //Filter
      gsap.to('.grid-filter-wrap', { 
        scrollTrigger: {
          trigger: ".grid-filter-wrap",
          start: 'bottom bottom',
          end: "bottom bottom",
          endTrigger: ".grid-works-wrap",
          pin: true,
          scrub: true,
          pinSpacing: false,
          pinType: 'transform',
        }
    });

    $('.grid-filter ul li').on('click', function(){
      $('.grid-filter ul li').removeClass('active');
      $(this).addClass('active');
      $('.grid-works-wrap .grid-work').removeClass('active-filter');
      var linkCat = $(this).data('filter');
      var workCat = $('.grid-works-wrap .grid-work').data('filter');
      $('.grid-works-wrap .grid-work').each(function(){
        if( linkCat != $(this).data('filter')){
          $(this).addClass('active-filter');
          $(this).css('pointer-events','none');
        }
      });

      $('.grid-filter ul li.all').on('click', function(){
        $('.grid-works-wrap .grid-work').removeClass('active-filter');
        $('.grid-works-wrap .grid-work').css('pointer-events','all');
      });

    });

    var filterAnimation = gsap.timeline({yoyo: false,reversed: true});
    filterAnimation.pause();
    filterAnimation.to($('.grid-filter ul'), { autoAlpha:1, y:0});
    $('.grid-filter .filter-trigger').on('click', function(){
      filterAnimation.reversed() ? filterAnimation.play(): filterAnimation.reverse();
    });


  }
}

/*----------------------------------------------------*/
/*	SCROLL TRIGGER
/*----------------------------------------------------*/

function trigger(){

  function desktopTrigger(){
    if($(window).width() > 1024){

  $('.image-anime').each(function(){
          gsap.from( $(this).find('img'),{ 
            scale: 1.4,
            duration:1,
              scrollTrigger: {
                trigger: $(this),
                start: "top bottom-=20%",
                end: "center 100px",
                onEnter: () =>  $(this).addClass('revealed'),
                }
          });
  });
  
  $('.photographer-hero').each(function(){
    const $this = $(this);
    gsap.to( $this.find('.man-image'), { 
      autoAlpha: 1,
      duration: 1,
      scrollTrigger: {
        trigger: $this,
        start: 'top bottom-=20%',
        end: 'center 100px',
        onEnter: () => {
          // Geri çağrı (callback) kullanarak autoAlpha animasyonunu ekleyin
          gsap.to($this.find('.man-image'), {
            autoAlpha: 1,
            width: '100%',
            duration: 1,
            delay:2,
          });
          gsap.to($this.find('.name-title'), {
            clipPath: "polygon(-2% 0%, 100% 0%, 105% 100%, 0% 100%)",
            duration: 1,
            delay:1,
          });
          gsap.to($this.find('.name-title'), {
            'margin-left':'-90px',
            'font-size': 'calc(1rem + 6vw)',
            duration: 1,
            delay:2,
          });
          gsap.to($this.find('.scene'), {
            autoAlpha:.3,
            duration: 1,
            delay:2,
          });
          gsap.to($this.find('.scroll-to-explore'), {
            autoAlpha:1,
            duration: 1,
            delay:2,
          });
        }
      }
    });
  });
  
  $('.map-anime').each(function(){
    gsap.from( $(this).find('img'),{ 
      scale: 1.4,
      duration:1,
        scrollTrigger: {
          trigger: $(this),
          start: "top bottom-=10%",
          end: "center 100px",
          onEnter: () =>  $(this).addClass('revealed'),
          }
    });
  });
  
  var parallaxImage = gsap.utils.toArray('.parallax-image');			
  parallaxImage.forEach(function(P) {
    var bg = P.querySelector("img");
    var parallax = gsap.fromTo( bg, {y: '-30%'}, {y: '20%', duration: 1, ease:Linear.easeNone});		
     ScrollTrigger.create({
      trigger: P,
      start: "top+=20% 100%",
      end: () => `+=${P.offsetHeight + window.innerHeight}`,
      animation: parallax,
      scrub: true,
     });
  });


  $('.text-anime').each(function(){
    gsap.to( $(this).find('.text-lines'),{ 
      y: 0,
      stagger:.1,
      delay : $(this).data('delay') ? $(this).data('delay') : 0,
      duration:1.1,
        scrollTrigger: {
          trigger: $(this),
          start: "top bottom-=20%",
          end: "center 100px",
          }
    });
  });
  
  
  $('.fade-up-anime').each(function(){
    gsap.to( $(this),{ 
      y: 0,
      autoAlpha:1,
      stagger:.1,
      duration:1.1,
        scrollTrigger: {
          trigger: $(this),
          start: "top bottom-=20%",
          end: "center 100px",
          }
    });
  });
  
  $('.services-1 .accordion-title').each(function(){
    gsap.to( $(this).find('hr'),{ 
      'width': '100%',
      duration:1.1,
        scrollTrigger: {
          trigger: $(this),
          start: "top bottom-=20%",
          end: "center 100px",
          },
          onComplete: function() {
            $('.accordion-title').addClass('in_view');
          }
    });
  });
  
  $('.hr-anime').each(function(){
    gsap.to( $(this),{ 
      'width': '100%',
      duration:1.1,
        scrollTrigger: {
          trigger: $(this),
          start: "top bottom-=20%",
          end: "center 100px",
          },
    });
  });
  
  $('.clip-animation').each(function(){
    var clipDown = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top bottom-=25%",
        end: "center 100px",
        immediateRender: false,
        }
      })
      clipDown.to( $(this), {  
      clipPath: "polygon(-2% 0%, 100% 0%, 105% 100%, 0% 100%)",
      delay : $(this).data('delay') ? $(this).data('delay') : 0,
      duration : $(this).data('duration') ? $(this).data('duration') : 0.7,
    }, 0);
  });
  
  // Only necessary to correct marker position - not needed in production
  if (document.querySelector('.gsap-marker-scroller-start')) {    
      const markers = gsap.utils.toArray('.gsap-marker-end, .gsap-marker-start'); // <<---- changed
    
      scrollbar.addListener(({ offset }) => {  
        gsap.set(markers, { marginTop: -offset.y })
      });
    }

  }
}

  desktopTrigger();

if($(window).width() < 1024){
  $(window).on('resize', function() { 
    if($(window).width() > 1024){
    setTimeout(() => {
    desktopTrigger();
    }, 250);
  }
  });
}



  $('.video-anime').each(function(){
    ScrollTrigger.create({
            trigger: $(this),
            start: "top bottom-=20%",
            end: "center 100px",
            onEnter: () =>  {
              $(this).addClass('revealed'),
              jQuery(this).find('video').get(0).play()
          },
          });
  });



  if($('.position-x-scroll').length){
    const pinWrap = document.querySelector(".position-x-wrap");
      let pinWrapWidth;
    let horizontalScrollLength;
    
    function refresh() {
      pinWrapWidth = pinWrap.offsetWidth;
      horizontalScrollLength = pinWrapWidth - window.innerWidth;
    }
    refresh();
        // Pinning and horizontal scrolling
        var itemOffset = $('.position-x-scroll').data('offset') ? $('.position-x-scroll').data('offset') : 30;
        gsap.to(".position-x-wrap", {
          scrollTrigger: {
            scrub: true,
            trigger: ".position-x-scroll",
            pin: true,
            pinType: 'transform',
            start: "top-="+ itemOffset +"% top",
            end: () => `+=${pinWrapWidth}`,
            invalidateOnRefresh: true
          },
          x: () => -horizontalScrollLength,
          ease: "none"
        });
        
        ScrollTrigger.addEventListener("refreshInit", refresh);  
}


//footer
gsap.set("footer .container", { yPercent: -50 });
const uncover = gsap.timeline({ paused: true });
uncover.to("footer .container", { yPercent: 0, ease: "none", 
});


ScrollTrigger.create({
  trigger: "footer",
  start: "top bottom",
  end: "+=30%",
  animation: uncover,
  scrub: true,
});

ScrollTrigger.refresh();


 
if($('.teammate-1').length){

  const pinBoxes = document.querySelectorAll(".team-wrap > *");
const pinWrap = document.querySelector(".team-wrap");
  let pinWrapWidth;
let horizontalScrollLength;

function refresh() {
  pinWrapWidth = pinWrap.offsetWidth;
  horizontalScrollLength = pinWrapWidth - window.innerWidth;
}
refresh();
    // Pinning and horizontal scrolling
    gsap.to(".team-wrap", {
      scrollTrigger: {
        scrub: true,
        trigger: ".teammate-1",
        pin: true,
        pinType: 'transform',
        start: "top-=15% top",
        end: () => `+=${pinWrapWidth}`,
        invalidateOnRefresh: true
      },
      x: () => -horizontalScrollLength,
      ease: "none"
    });
    
    ScrollTrigger.addEventListener("refreshInit", refresh);  
  }


var redirectLinks = document.querySelectorAll('.redirect');
redirectLinks.forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // Sayfanın üstüne gitmeyi engelle
    var href = link.getAttribute('href');
    var duration = $(this).data('duration');
    var targetElement = document.querySelector(href);
    if (targetElement) {
      scrollbar.scrollTo(0, targetElement.offsetTop,duration);
    }
  });
});


}

/*----------------------------------------------------*/
/*	TESTIMONIAL
/*----------------------------------------------------*/

function commentSlider(){
  var sliderProgress = gsap.timeline({yoyo: false,reversed: true});
  sliderProgress.pause();
  sliderProgress.to($('.progress span'), { 'width': '100%', duration:5, clearProps: 'all' });
  
  var swiper = new Swiper('.testimonial-slider', {
    direction: "horizontal",
    spaceBetween: 500,
    loop: false,
    resistance : true,
    resistanceRatio:0.5,
    slidesPerView: 1,
    allowTouchMove:true,  
    speed:1500,
    navigation: {
      prevEl: '.testimonial-slider .slider-arrows .ri-arrow-left-line',
      nextEl: '.testimonial-slider .slider-arrows .ri-arrow-right-line'
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    on:{
      afterInit	: function(){
        sliderProgress.play();
      },
      slideChangeTransitionEnd	: function(){
        sliderProgress.restart();
      },
      slideChangeTransitionStart: function () {
        sliderProgress.kill();
        var activeIndex = this.activeIndex;
        var counterNumber = $('.active.number');
        var slideNumber = activeIndex > 9 ? activeIndex : "0" + (activeIndex + 1);
        gsap.to(counterNumber, 0.3, {
          opacity: 0,
          transform: "translateY(-10px)",
          ease: "Expo.easeInOut",
          onComplete: () => {
            counterNumber.text(slideNumber);
            gsap.fromTo(
              counterNumber,
              0.3,
              {
                opacity: 0,
                transform: "translateY(10px)",
              },
              {
                opacity: 1,
                transform: "translateY(0px)",
                ease: "Expo.easeInOut",
              }
            );
          },
        });
      },
    }
  });
  
}


/*----------------------------------------------------*/
/*	ACCORDION
/*----------------------------------------------------*/

function accordion(){

	$(".accordion-title").on("click", function(e) {

		e.preventDefault();
		var $this = $(this);

		if (!$this.hasClass("accordion-active")) {
			$(".accordion-title p").slideUp(400);
			$(".accordion-title").removeClass("accordion-active");
		}

		$this.toggleClass("accordion-active");
		$this.find('p').slideToggle();
	});

  
}

/*----------------------------------------------------*/
/*	COUNTER
/*----------------------------------------------------*/

function counter(){

  var numberCounters = $('.counter');
  numberCounters.each(function() {
    let $this = $(this);
    let number = $this.children('.count-number');
    
    number.each(function() {
      let $this = $(this);
      let countParent = $this.parent(numberCounters);
      let numVal = $this.text();
      let num1 = "<span class='num_val_anim'>" + (numVal - 3) + "</span>";
      let num2 = "<span class='num_val_anim'>" + (numVal - 2) + "</span>";
      let num3 = "<span class='num_val_anim'>" + (numVal - 1) + "</span>";
      $this.prepend(num1, num2, num3);
      $this.wrapInner("<div class='numbers-wrapper'></div>");
      let numWrapper = $this.children('.numbers-wrapper');
      let parent = $this.parents(numberCounters);
      let delay = parent.data('delay');
      gsap.to(numWrapper, 1.5, {
        y: "-75%",
        delay: delay,
        ease: "power2.inOut",
        scrollTrigger: { trigger: parent, position: "bottom bottom" },
        onStart: function() {
          countParent.addClass('in_view');
        }
      });
    });
  });
    
}


/*----------------------------------------------------*/
/*	NEWS HOVER
/*----------------------------------------------------*/

function news(){

  gsap.set($('.news-type-1 .news-item img'), {
    y: '-101%'
  })

  $('.news-type-1 .news-item').hover(
    function () {
      gsap.to($(this).find('.news-image img'), {
        autoAlpha: 1,
        y: 0,
      });
      gsap.to($(this).prevAll().find('.news-image img'), {
        y: '101%',
      });

      gsap.to($(this).nextAll().find('.news-image img'), {
        y: '-101%',
      });
    },
  );

  $('.news-type-1 .news-wrapper').mouseleave(function () {
    gsap.to($(this).find('.news-image img'), {
      autoAlpha: 0,
  });


  });
  
}


/*----------------------------------------------------*/
/*	HEADER
/*----------------------------------------------------*/
function header(){

  var headerAnimation = gsap.timeline({yoyo: false,reversed: true});
      headerAnimation.pause();

      headerAnimation.from($('.overlay-menu'), { autoAlpha:0  });
      headerAnimation.from($('.overlay-menu .left-area'), { y:'100vh' },0.1);
      headerAnimation.from($('.overlay-menu .right-area'), { y:'-100vh' }, 0.1);
      headerAnimation.from($('.overlay-menu .right-area ul'), {  autoAlpha:0, stagger:.1 }, 0.5);
      headerAnimation.from($('.overlay-menu nav li:not(.overlay-menu nav ul li ul li)'), { stagger:.1, y: 30, autoAlpha:0, ease: "Expo.easeInOut", }, 0.5);
      headerAnimation.from($('.overlay-menu nav li:not(.overlay-menu nav ul li ul li)'), { 'clearProps': 'all', delay:1.3, ease: "Expo.easeInOut", }, 0.5);


  $('header .burger-menu, .overlay-menu .close').on('click', function(){
    headerAnimation.reversed() ? headerAnimation.play(): headerAnimation.reverse();
  });


  $('.overlay-menu .menu-item-has-children').each(function(){
    $(this).children('ul').append('<li><a class="back" href="#">back <i class="ri-corner-down-left-line"></i></a></li>');
  });
  
$('.overlay-menu .menu-item-has-children > a').each(function(){
  var overlay_animation = gsap.timeline({yoyo: false,reversed: true});

    overlay_animation.pause();
    overlay_animation.to( $(this).closest('ul').children('li').children('a'), { stagger:.1, autoAlpha:0, y:-50,  'pointer-events': 'none',  ease: Power3.easeOut  } )
    overlay_animation.to($(this).next('ul'),{ 'z-index':'10', 'pointer-events': 'all' }),
    overlay_animation.from($(this).next('ul').children('li').children('a'), {stagger:.1, autoAlpha:0, y:30,  ease: Power3.easeOut });

    this.animation = overlay_animation;

    $(".overlay-menu .back, .overlay-menu .close").on('click', function() {
      
    overlay_animation.reverse();
    });
    

});

	$(".overlay-menu .menu-item-has-children > a").on('click', function() {
    this.animation.reversed() ? this.animation.play(): this.animation.reverse();
	})

  if($('#fixed').length){
    scrollbar.addListener(({ offset }) => {  
      fixed.style.top = offset.y + ($(window).height() - 90) + 'px';
    });
  }  


  gsap.to('.slider-bottom', { 
    scrollTrigger: {
      trigger: ".slider-bottom",
      start: 'bottom bottom',
      end: "bottom bottom",
      endTrigger: ".perspective-slider",
      pin: true,
      scrub: true,
      pinSpacing: false,
      pinType: 'transform',
    }
 });

 gsap.to('.freelancer-hero .image.top', { 
  scrollTrigger: {
    trigger: ".freelancer-hero .image.top",
    start: 'top+=20% top+=20%',
    end: "bottom bottom-=100%",
    endTrigger: ".freelancer-hero",
    pin: true,
    scrub: true,
    pinSpacing: false,
    pinType: 'transform',
  }
});

gsap.to('.freelancer-hero .image.bottom', { 
  scrollTrigger: {
    trigger: ".freelancer-hero .image.bottom",
    start: 'bottom bottom',
    end: "bottom bottom-=100%",
    endTrigger: ".freelancer-hero",
    pin: true,
    scrub: true,
    pinSpacing: false,
    pinType: 'transform',
  }
});


  /* Header hide show */
  var showAnim = gsap.from('header', { 
    yPercent: -100,
    paused: true,
    duration: 0.4
  }).progress(1);

  if ($('header').length) {
    scrollbar.addListener(({ offset }) => {  
      $('header').css('top', offset.y + 'px');
    });
  }

  if ($('.overlay-menu').length) {
    scrollbar.addListener(({ offset }) => {  
      $('.overlay-menu').css('top', offset.y + 'px');
    });
  }
  
  if($('.perspective-slider:not(".freelancer-works-wrap .perspective-slider")').length){
  ScrollTrigger.create({
    trigger: $('.perspective-slider'),
    endTrigger: "footer",
    start: "bottom bottom+=50%",
    end: "bottom bottom",
    onUpdate: (self) => {
    self.direction === -1 ? showAnim.play() : showAnim.reverse()
    }
  });
    
}else{
  ScrollTrigger.create({
    start: "100px",
    end: 99999,
    onUpdate: (self) => {
    self.direction === -1 ? showAnim.play() : showAnim.reverse()
    }
  });
}

}


/*----------------------------------------------------------------------*/
/*  CURSOR SETTINGS
/*----------------------------------------------------------------------*/

function cursorMoveFunc() {
  var e = $("#cursor");
  function t(t) {
      function n() {
          e.find(".cursor__label").text("");
      }
      gsap.to(e, 0.5, {
          left: t.clientX - e.width() / 2,
          top: t.clientY - e.height() / 2,
      }), n();

    }
  var n = function() {
    $(window).on("mousemove", t)
  };
  n(), $(window).resize(n);



  $("*[data-cursor-type='arrow']").each( function(){
    $(this).mouseover(function() {
      $('#cursor').addClass("is-arrow");
      var cursorColor = $(this).data('cursor-color');
      if(cursorColor == '#fff'){
        gsap.to($('#cursor i'),{color: '#000',duration:.1})
      }
      gsap.to($('#cursor .cursor__bg'),{backgroundColor:$(this).data('cursor-color'),duration:.1})
    }).mouseleave(function() {
      $('#cursor').removeClass("is-arrow");
      gsap.to($('#cursor .cursor__bg'),{clearProps: 'all',duration:.1})
    });
  });




  $(".lightbox").each( function(){
    $(this).mouseover(function() {
      $('#cursor').addClass("is-zoom");
      var cursorColor = $(this).data('cursor-color');
      if(cursorColor == '#fff'){
        gsap.to($('#cursor i'),{color: '#000',duration:.1})
      }
      gsap.to($('#cursor .cursor__bg'),{backgroundColor:$(this).data('cursor-color'),duration:.1})
    }).mouseleave(function() {
      $('#cursor').removeClass("is-zoom");
      gsap.to($('#cursor .cursor__bg'),{clearProps: 'all',duration:.1})
    });
  });



}



    /*----------------------------------------------------*/
    /* WebGL Animation
    /*----------------------------------------------------*/

    function LineWebgl() {

      if($('#scene').length){
        

      var canvas = document.querySelector('canvas');
      var width = canvas.offsetWidth,
          height = canvas.offsetHeight;
      
      var renderer = new THREE.WebGLRenderer({
          canvas: canvas,
          antialias: true,
          alpha: true 
      });
      renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000,0);
      
      var scene = new THREE.Scene();
      
      var camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
      camera.position.set(0, 0, 350);
      
      var sphere = new THREE.Group();
      scene.add(sphere);
      var material = new THREE.LineBasicMaterial({
          color: 0xffffff
      });
      var linesAmount = 18;
      var radius = 100;
      var verticesAmount = 50;
      for(var j=0;j<linesAmount;j++){
          var index = j;
          var geometry = new THREE.Geometry();
          geometry.y = (index/linesAmount) * radius*2;
          for(var i=0;i<=verticesAmount;i++) {
              var vector = new THREE.Vector3();
              vector.x = Math.cos(i/verticesAmount * Math.PI*2);
              vector.z = Math.sin(i/verticesAmount * Math.PI*2);
              vector._o = vector.clone();
              geometry.vertices.push(vector);
          }
          var line = new THREE.Line(geometry, material);
          sphere.add(line);
      }
      
      function updateVertices (a) {
      for(var j=0;j<sphere.children.length;j++){
          var line = sphere.children[j];
          line.geometry.y += 0.3;
          if(line.geometry.y > radius*2) {
              line.geometry.y = 0;
          }
          var radiusHeight = Math.sqrt(line.geometry.y * (2*radius-line.geometry.y));
          for(var i=0;i<=verticesAmount;i++) {
              var vector = line.geometry.vertices[i];
                  var ratio = noise.simplex3(vector.x*0.009, vector.z*0.009 + a*0.0006, line.geometry.y*0.0019) * 15;
                  vector.copy(vector._o);
                  vector.multiplyScalar(radiusHeight + ratio);
                  vector.y = line.geometry.y - radius;
              }
          line.geometry.verticesNeedUpdate = true;
      }
      }
      
      function render(a) {
          requestAnimationFrame(render);
          updateVertices(a);
          renderer.render(scene, camera);
      }
      
      function onResize() {
          canvas.style.width = '';
          canvas.style.height = '';
          width = canvas.offsetWidth;
          height = canvas.offsetHeight;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
      }
      
      var mouse = new THREE.Vector2(0.8, 0.5);    
      function onMouseMove(e) {
          mouse.y = e.clientY / window.innerHeight;
          gsap.to(sphere.rotation, 2, {
              x : (mouse.y * 1),
              ease:Power1.easeOut
          });
      }
      
      requestAnimationFrame(render);
      window.addEventListener("mousemove", onMouseMove);
      var resizeTm;
      window.addEventListener("resize", function(){
          resizeTm = clearTimeout(resizeTm);
          resizeTm = setTimeout(onResize, 200);
      });

    }
  }




}); // Document end

