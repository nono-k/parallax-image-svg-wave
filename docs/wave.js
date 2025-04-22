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

    this.flatD = `M 79.7156 20 C 104.231 20 126.153 20 147.73 20 C 197.458 20 245.357 20 360 20 V 20 H 0 V 20 C 16 20 37 20 59.8978 20 H 79.7156 Z`;
    this.waveD = `M 79.7156 0 C 104.231 1.3955 126.153 3.9836 147.73 6.531 C 197.458 12.4017 245.357 18.0565 360 7 V 28 H 0 V 10.1055 C 16.397 5.7112 36.8899 1.0858 59.8978 0 H 79.7156 Z`;
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
    }, 150);
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