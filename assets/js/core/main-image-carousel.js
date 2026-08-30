document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-main-image-carousel]").forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll("[data-main-image-slide]"));
    if (slides.length < 2) return;

    const previousButton = carousel.querySelector("[data-main-image-previous]");
    const nextButton = carousel.querySelector("[data-main-image-next]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let currentIndex = 0;
    let timer;

    const show = (offset) => {
      slides[currentIndex].hidden = true;
      currentIndex = (currentIndex + offset + slides.length) % slides.length;
      slides[currentIndex].hidden = false;
    };

    const stop = () => window.clearInterval(timer);

    const start = () => {
      stop();
      if (reducedMotion.matches) return;
      timer = window.setInterval(() => show(1), 4000);
    };

    const select = (offset) => {
      show(offset);
      start();
    };

    previousButton.addEventListener("click", () => select(-1));
    nextButton.addEventListener("click", () => select(1));

    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);
    carousel.addEventListener("focusin", stop);
    carousel.addEventListener("focusout", start);
    reducedMotion.addEventListener("change", start);

    start();
  });
});
