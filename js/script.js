document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".participants__slider");
  const slides = Array.from(document.querySelectorAll(".participants__slide"));
  const prevButton = document.querySelector("#participants-button-prev");
  const nextButton = document.querySelector("#participants-button-next");
  const currientSlideIndicator = document.querySelector(".participants__carousel-currient");
  const totlalSlideIndicator = document.querySelector(".participants__carousel-total");

  let totalSlides = slides.length;
  let currentIndex = 0;
  let slideWidth = slides[0].offsetWidth;
  let visibleSlides = getVisibleSlides();

  totlalSlideIndicator.textContent = totalSlides;

  function getVisibleSlides() {
    const width = window.innerWidth;
    if (width <= 576) {
      return 1;
    } else if (width <= 768) {
      return 2;
    } else {
      return 3;
    }
  }

  function cloneSlides() {
    const firstSlides = [];
    const lastSlides = [];
    for (let i = 0; i < visibleSlides; i++) {
      firstSlides.push(slides[i].cloneNode(true));
      lastSlides.push(slides[totalSlides - 1 - i].cloneNode(true));
    }
    firstSlides.forEach((slide) => slider.appendChild(slide));
    lastSlides.reverse().forEach((slide) => slider.insertBefore(slide, slides[0]));
  }

  function updateSlider() {
    slideWidth = slides[0].offsetWidth + 20;
    visibleSlides = getVisibleSlides();
    slider.style.transition = "none"; // Отключаем анимацию при изменении размера
    slider.style.transform = `translateX(-${(currentIndex + visibleSlides) * slideWidth}px)`;
  }

  function updateSliderPosition() {
    slider.style.transition = "transform 0.5s ease";
    slider.style.transform = `translateX(-${(currentIndex + visibleSlides) * slideWidth}px)`;
  }

  function checkIndex() {
    if (currentIndex >= totalSlides) {
      currentIndex = 0;
      slider.style.transition = "none";
      slider.style.transform = `translateX(-${visibleSlides * slideWidth}px)`;
    } else if (currentIndex < 0) {
      currentIndex = totalSlides - 1;
      slider.style.transition = "none";
      slider.style.transform = `translateX(-${(currentIndex + visibleSlides) * slideWidth}px)`;
    }
    currientSlideIndicator.textContent = currentIndex + 1;
  }

  function showNextSlide() {
    currentIndex++;
    updateSliderPosition();
    setTimeout(checkIndex, 500);
  }

  function showPrevSlide() {
    currentIndex--;
    updateSliderPosition();
    setTimeout(checkIndex, 500);
  }

  nextButton.addEventListener("click", showNextSlide);
  prevButton.addEventListener("click", showPrevSlide);

  setInterval(showNextSlide, 4000);

  // Клонирование слайдов и начальная установка позиции
  cloneSlides();
  currentIndex = 0; // Устанавливаем текущий индекс на 0
  slider.style.transition = "none"; // Отключаем анимацию при начальной установке
  slider.style.transform = `translateX(-${visibleSlides * slideWidth}px)`;

  window.addEventListener("resize", updateSlider);
  updateSlider();
});
