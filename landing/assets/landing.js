/*----------------------------------------------------*/
/*	PRELOADER
/*----------------------------------------------------*/

function preloader(){

    var progressBar = $(".progress");
    var percentageText = $(".percentage");
  
    var tl = gsap.timeline();
  
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

    var elem = document.querySelector("#content-scroll");
    var scrollbar = Scrollbar.init(elem,
    {
        renderByPixels: true,
        damping:0.1
    });

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
          color: 0x0ffffff
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


  LineWebgl();

  function gridBalance(){
    if($(window).width() > 767){
        scrollbar.addListener(function (status) {
          var scrollY = status.offset.y;
          $('.right-demos').each(function(){
          var translateY = scrollY / $(this).data('balance');
              gsap.to($(this), { y: translateY + 'px', duration:.1 })
      });
      });

        scrollbar.addListener(function (status) {
            var scrollY = status.offset.y;
            var translateY = (scrollY / 7) - 1600;
                gsap.to($('.right-others'), { y: translateY + 'px', duration:.1 })
        });
    }
  }

   gridBalance();

   $(window).resize(function() {
    gridBalance();
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
        gsap.to(".position-x-wrap", {
          scrollTrigger: {
            scrub: true,
            trigger: ".position-x-scroll",
            pin: true,
            pinType: 'transform',
            start: "top-=5% top",
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