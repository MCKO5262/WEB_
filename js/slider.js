const slides = document.querySelectorAll(".swiper-slide"); // Бүх слайдыг сонгоно
const prevButton = document.querySelector(".nav-prev"); // Өмнөх слайд руу шилжих товчийг сонгоно
const nextButton = document.querySelector(".nav-next"); // Дараагийн слайд руу шилжих товчийг сонгоно
let current = 0; // Одоогийн слайдын индекс
let auto = null; // Автомат слайд солигдолтын интервал
let isTransitioning = false; // Слайд шилжиж байгаа эсэхийг хянах төлөв

// Тухайн индексийн слайдыг үзүүлэх функц
function showSlide(index) {
  if (isTransitioning) return; // Шилжилт дунд бол зогсооно
  isTransitioning = true;

  // Бүх слайдаас 'active' классыг устгана
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  // Шинэ слайдад 'active' классыг нэмнэ
  slides[index].classList.add("active");

  // Слайд тоолуурыг шинэчилнэ
  slides.forEach((slide) => {
    const counter = slide.querySelector(".slide-counter");
    if (counter) {
      counter.textContent = `${index + 1}/${slides.length}`;
    }
  });

  isTransitioning = false;
}

// Дараагийн слайдыг үзүүлэх функц
function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

// Өмнөх слайдыг үзүүлэх функц
function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
}

// Автоматаар слайд солигдохыг эхлүүлэх функц
function startAutoplay() {
  if (auto) clearInterval(auto); // Хэрэв өмнө нь интервал байвал цэвэрлэнэ
  auto = setInterval(nextSlide, 5000); // 5 секунд тутамд дараагийн слайдыг үзүүлнэ
}

// Автоматаар слайд солигдохыг зогсоох функц
function stopAutoplay() {
  if (auto) {
    clearInterval(auto); // Интервалыг зогсооно
    auto = null;
  }
}

// Өмнөх слайд руу шилжих товчлуурын үйлдэл
prevButton.addEventListener("click", () => {
  stopAutoplay(); // Автоматаар солигдолтыг зогсооно
  prevSlide(); // Өмнөх слайдыг үзүүлнэ
  startAutoplay(); // Дахин автоматаар солигдолтыг эхлүүлнэ
});

// Дараагийн слайд руу шилжих товчлуурын үйлдэл
nextButton.addEventListener("click", () => {
  stopAutoplay(); // Автоматаар солигдолтыг зогсооно
  nextSlide(); // Дараагийн слайдыг үзүүлнэ
  startAutoplay(); // Дахин автоматаар солигдолтыг эхлүүлнэ
});

// Эхний слайдыг үзүүлж, автоматаар солигдолтыг эхлүүлнэ
showSlide(current);
startAutoplay();
