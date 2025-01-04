const slides = document.querySelectorAll(".swiper-slide"); // Бүх слайдыг сонгоно
const prevButton = document.querySelector(".nav-prev"); // Өмнөх слайд руу шилжих товчийг сонгоно
const nextButton = document.querySelector(".nav-next"); // Дараагийн слайд руу шилжих товчийг сонгоно
const wrapper = document.querySelector(".swiper-wrapper"); // Слайдуудыг багтаасан wrapper элементийг сонгоно
let current = 0; // Одоогийн слайдын индекс
let auto = null;
let t = false;

// Тухайн индексийн слайдыг үзүүлэх функц
function showSlide(index) {
  if (t) return;
  t = true;
  // Бүх слайдаас 'active' устгана
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  slides[index].classList.add("active");

  slides.forEach((slide) => {
    const counter = slide.querySelector(".slide-counter");
    counter.textContent = `${index + 1}/${slides.length}`;
  });
  t = false;
}
// Дараагийн слайдыг үзүүлэх функц
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
  auto = setInterval(nextSlide, 5000); // 5 секунд тутамд дараагийн слайдыг үзүүлнэ
}
// Өмнөх слайд руу шилжих товчлуурын үйлдэл
prevButton.addEventListener("click", () => {
  prevSlide(); // Өмнөх слайдыг үзүүлнэ
  startAutoplay(); // Дахин автоматаар солигдолтыг эхлүүлнэ
});
// Дараагийн слайд руу шилжих товчлуурын үйлдэл
nextButton.addEventListener("click", () => {
  nextSlide(); // Дараагийн слайдыг үзүүлнэ
  startAutoplay(); // Дахин автоматаар солигдолтыг эхлүүлнэ
});

showSlide(current);
startAutoplay();
