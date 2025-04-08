const slides = document.querySelectorAll(".swiper-slide"); 
const prevButton = document.querySelector(".nav-prev"); 
const nextButton = document.querySelector(".nav-next"); 
let current = 0; // Одоогийн слайдын индекс
let auto = null; // Автомат слайд солигдолтын интервал
let isTransitioning = false; 
function showSlide(index) {
  if (isTransitioning) return; 
  isTransitioning = true;

  // Бүх слайдаас 'active' классыг устгана
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  slides[index].classList.add("active");
  slides.forEach((slide) => {
    const counter = slide.querySelector(".slide-counter");
    if (counter) {
      counter.textContent = `${index + 1}/${slides.length}`;
    }
  });

  isTransitioning = false;
}
function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}
function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
}
// Автоматаар слайд солигдохыг эхлүүлэх функц
function startAutoplay() {
  if (auto) clearInterval(auto); 
  auto = setInterval(nextSlide, 5000); // 5 секунд тутамд дараагийн слайдыг үзүүлнэ
}
function stopAutoplay() {
  if (auto) {
    clearInterval(auto);
    auto = null;
  }
}
prevButton.addEventListener("click", () => {
  stopAutoplay(); 
  prevSlide(); 
  startAutoplay(); 
});
nextButton.addEventListener("click", () => {
  stopAutoplay(); 
  nextSlide(); 
  startAutoplay(); 
});
showSlide(current);
startAutoplay();
