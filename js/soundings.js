// SOUNDINGS carousel — Swiper with click-to-advance, live caption + counter
document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('.soundings-carousel');
  if (!el || typeof Swiper === 'undefined') return;

  const captionEl = document.querySelector('.soundings-caption');
  const counterEl = document.querySelector('.soundings-counter');
  const total = el.querySelectorAll('.swiper-wrapper > .swiper-slide').length;

  // Optional deep-link: soundings.html#3 opens on the 3rd group
  const fromHash = parseInt((location.hash || '').slice(1), 10);
  const initialSlide = Number.isInteger(fromHash) && fromHash >= 1 && fromHash <= total
    ? fromHash - 1 : 0;

  const swiper = new Swiper(el, {
    slidesPerView: 1,
    loop: true,
    initialSlide: initialSlide,
    speed: 600,
    grabCursor: false,
    keyboard: { enabled: true },
    a11y: { enabled: true },
  });

  function render() {
    const active = swiper.slides[swiper.activeIndex];
    if (active && captionEl) captionEl.textContent = active.getAttribute('data-caption') || '';
    if (counterEl) counterEl.textContent = (swiper.realIndex + 1) + '/' + total;
  }

  swiper.on('slideChange', render);
  render();

  // Re-measure once images report their real dimensions
  el.querySelectorAll('img').forEach(img => {
    if (!img.complete) img.addEventListener('load', () => swiper.update(), { once: true });
  });

  // Click left half = previous, right half = next (Swiper fires 'click' on taps, not drags)
  swiper.on('click', (sw, e) => {
    if (e.clientX < window.innerWidth / 2) sw.slidePrev();
    else sw.slideNext();
  });

  // Directional cursor over the two click zones
  el.addEventListener('mousemove', (e) => {
    const prev = e.clientX < window.innerWidth / 2;
    el.classList.toggle('cursor-prev', prev);
    el.classList.toggle('cursor-next', !prev);
  });
});
