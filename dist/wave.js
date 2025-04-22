class ParallaxScroll {
  constructor() {
    this.els = document.querySelectorAll('.js-parallax');
    if(!this.els.length) return
    this.init();
  }
  init() {
    this.initSmoothScrolling();
    this.scroll();
    this.scrollTimeout = null;

    window.addEventListener('scroll', this.handleScroll.bind(this));
  }
  scroll() {

    this.els.forEach(el => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
      const item = el.querySelector('.js-parallax-item');

      tl.fromTo(item, {
        ease: 'none',
        yPercent: -10,
      }, {
        ease: 'none',
        yPercent: 10,
      })
    })
  }
  handleScroll() {
    this.setWave();

    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.resetWave();
    }, 100);
  }

  setWave() {
    this.els.forEach(el => {
      const wave = el.querySelector('.js-wave');
      wave.classList.add('is-moving');
    })
  }

  resetWave() {
    this.els.forEach(el => {
      const wave = el.querySelector('.js-wave');
      wave.classList.remove('is-moving');
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

new ParallaxScroll();