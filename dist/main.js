class ParallaxImage {
  constructor() {
    this.els = document.querySelectorAll('.parallax__image');
    if(!this.els.length) return
    this.init();
  }

  init() {
    this.initSmoothScrolling();
    this.scroll();
  }

  scroll() {
    this.els.forEach(el => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });
      const image = el.querySelector('img');

      tl.fromTo(image, {
        ease: 'none',
        yPercent: -10,
      }, {
        ease: 'none',
        yPercent: 10,
      })

    })
  }

  initSmoothScrolling() {
    const lenis = new Lenis({ lerp: 0.2, smoothWheel: true });
    lenis.on('scroll', () => ScrollTrigger.update());

    const scrollFn = (time) => {
      lenis.raf(time);
      requestAnimationFrame(scrollFn);
    };

    requestAnimationFrame(scrollFn);
  }
}

new ParallaxImage();