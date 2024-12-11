class ArtistDetailManager {
  constructor() {
    this.apiUrl = 'https://api.jsonbin.io/v3/qs/6759b63fe41b4d34e463bae6';
    this.currentArtist = null;
    this.init();
  }

  async init() {
    try {
      // Get the artist ID from URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const artistId = urlParams.get('id');

      if (!artistId) {
        throw new Error('No artist ID provided');
      }

      // Fetch artist data
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      this.currentArtist = data.record.find(artist => artist.id === parseInt(artistId));

      if (!this.currentArtist) {
        throw new Error('Artist not found');
      }

      this.renderArtistDetail();
      this.setupMediaControls();
      this.setupButtons();

    } catch (error) {
      console.error('Error initializing ArtistDetailManager:', error);
      this.showError(error.message);
    }
  }

  renderArtistDetail() {
    // Update profile information
    const profileName = document.getElementById('profile-name');
    if (profileName) {
      profileName.textContent = this.currentArtist.name;
    }

    // Update profile image
    const profileImage = document.getElementById('profile-image');
    if (profileImage) {
      profileImage.src = this.currentArtist.image;
      profileImage.alt = this.currentArtist.name;
    }

    // Update price and location
    const priceElement = document.querySelector('.product-info');
    if (priceElement) {
      priceElement.innerHTML = `
        ★★★★★<br>
        ${this.currentArtist.location}<br>
        ${this.formatPrice(this.currentArtist.price)} ₮
      `;
    }

    // Update description
    const descriptionSection = document.querySelector('#main-grid');
    if (descriptionSection) {
      const descriptionContent = document.createElement('div');
      descriptionContent.innerHTML = `
        <h3>Товч агуулга</h3>
        <p>${this.currentArtist.description}</p>
      `;
      descriptionSection.appendChild(descriptionContent);
    }
  }

  setupMediaControls() {
    const mediaControls = document.getElementById('media-controls');
    if (!mediaControls) return;

    // Create media player container
    const videoContainer = document.getElementById('video-container');
    if (videoContainer) {
      videoContainer.innerHTML = `
        <video id="artist-video" controls style="display: none;">
          <source src="${this.currentArtist.video}" type="video/mp4">
        </video>
        <img id="artist-image" src="${this.currentArtist.image}" alt="${this.currentArtist.name}" style="display: none;">
        <audio id="artist-audio" controls style="display: none;">
          <source src="${this.currentArtist.audio}" type="audio/mpeg">
        </audio>
      `;
    }

    // Setup media control buttons
    mediaControls.addEventListener('click', (e) => {
      const video = document.getElementById('artist-video');
      const image = document.getElementById('artist-image');
      const audio = document.getElementById('artist-audio');

      switch (e.target.textContent.trim()) {
        case 'Video':
          video.style.display = 'block';
          image.style.display = 'none';
          audio.style.display = 'none';
          break;
        case 'Images':
          video.style.display = 'none';
          image.style.display = 'block';
          audio.style.display = 'none';
          break;
        case 'Audio':
          video.style.display = 'none';
          image.style.display = 'none';
          audio.style.display = 'block';
          break;
      }
    });
  }

  setupButtons() {
    // Setup order button
    const orderButton = document.getElementById('order-button');
    if (orderButton) {
      orderButton.addEventListener('click', () => {
        window.location.href = `ordercheck.html?artist=${this.currentArtist.id}`;
      });
    }

    // Setup like button
    const likeButton = document.getElementById('like-button');
    if (likeButton) {
      likeButton.addEventListener('click', () => {
        this.handleLike();
      });
    }

    // Setup schedule button
    const scheduleButton = document.getElementById('schedule-button');
    if (scheduleButton) {
      scheduleButton.addEventListener('click', () => {
        this.showSchedule();
      });
    }
  }

  handleLike() {
    // Implement like functionality
    console.log('Liked artist:', this.currentArtist.name);
    // You could add local storage or API call here to track likes
  }

  showSchedule() {
    // Implement schedule display
    alert('Schedule feature coming soon!');
  }

  formatPrice(price) {
    return new Intl.NumberFormat('mn-MN').format(price);
  }

  showError(message) {
    const container = document.querySelector('#main-grid');
    if (container) {
      container.innerHTML = `
        <div class="error-message">
          <p>Алдаа гарлаа: ${message}</p>
          <p>Та хуудсаа refresh хийнэ үү.</p>
        </div>
      `;
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ArtistDetailManager();
});

export default ArtistDetailManager;