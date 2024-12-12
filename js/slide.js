document.addEventListener('DOMContentLoaded', () => {
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  const swiperContainer = document.querySelector('.swiper-container');

  // Function to fetch and render slides from JSON
  async function loadSlidesFromJSON() {
    try {
      // Fetch the JSON file
      const response = await fetch('/json/slide.json');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const events = await response.json();

      // Clear existing slides
      swiperWrapper.innerHTML = '';

      if (events.length === 0) throw new Error('No events available.');

      // Create slides dynamically
      events.forEach((event, index) => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        
        // Add 'active' class to the first slide
        if (index === 0) slide.classList.add('active');

        slide.innerHTML = `
          <section class="event-section">
            <img src="${event.imageUrl}" alt="${event.title}">
            <div class="event-controls">
              <a href="${event.detailLink}" class="event-button">Дэлгэрэнгүй</a>
              <div class="slide-counter">${index + 1}/${events.length}</div>
            </div>
          </section>
        `;

        swiperWrapper.appendChild(slide);
      });

      // Reinitialize slider functionality after loading
      initializeSlider();

    } catch (error) {
      console.error('Error loading slider content:', error);
      swiperWrapper.innerHTML = `
        <div class="swiper-slide active">
          <section class="event-section">
            <p>Failed to load events. Please try again later.</p>
          </section>
        </div>
      `;
    }
  }

  // Slider initialization function
  function initializeSlider() {
    const swiperSlides = swiperWrapper.querySelectorAll('.swiper-slide');
    const prevButton = swiperContainer.querySelector('.nav-prev');
    const nextButton = swiperContainer.querySelector('.nav-next');
    const totalSlides = swiperSlides.length;

    if (totalSlides === 0) return;

    let currentSlideIndex = 0;

    // Update slide visibility and counter
    function updateSlider() {
      // Hide all slides
      swiperSlides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlideIndex);
      });

      // Update slide counter
      const counter = swiperSlides[currentSlideIndex].querySelector('.slide-counter');
      if (counter) {
        counter.textContent = `${currentSlideIndex + 1}/${totalSlides}`;
      }
    }

    // Navigate to next slide
    function nextSlide() {
      currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
      updateSlider();
    }

    // Navigate to previous slide
    function prevSlide() {
      currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
      updateSlider();
    }

    // Remove existing event listeners if any
    if (prevButton) prevButton.replaceWith(prevButton.cloneNode(true));
    if (nextButton) nextButton.replaceWith(nextButton.cloneNode(true));

    // Add event listeners to navigation buttons
    const newPrevButton = swiperContainer.querySelector('.nav-prev');
    const newNextButton = swiperContainer.querySelector('.nav-next');
    if (newPrevButton) newPrevButton.addEventListener('click', prevSlide);
    if (newNextButton) newNextButton.addEventListener('click', nextSlide);

    // Initial setup
    updateSlider();
  }

  // Load slides when page loads
  loadSlidesFromJSON();
});
