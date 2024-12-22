import ApiService from './Apiartist.js';

class ArtistDetailManager {
  constructor() {
    this.artist = null;
    this.init();
  }

  async init() {
    try {
      const artistId = this.getArtistIdFromUrl();
      if (!artistId) {
        console.error('No artist ID found in URL');
        return;
      }

      await this.fetchAndDisplayArtist(artistId);
      this.setupMediaControls();
      this.setupEventListeners();
    } catch (error) {
      console.error('Error initializing artist detail page:', error);
    }
  }

  getArtistIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  }

  async fetchAndDisplayArtist(artistId) {
    try {
      const artists = await ApiService.fetchArtists();
      this.artist = artists.find(artist => artist.id === parseInt(artistId));
      
      if (!this.artist) {
        console.error('Artist not found');
        return;
      }

      this.updatePageContent();
    } catch (error) {
      console.error('Error fetching artist data:', error);
    }
  }

  updatePageContent() {
    if (!this.artist) return;

    // Update profile image
    const profileImage = document.getElementById('profile-image');
    if (profileImage) {
      profileImage.src = this.artist.image;
      profileImage.onerror = () => {
        profileImage.src = './picture/default.png';
      };
    }

    // Update profile name
    const profileName = document.getElementById('profile-name');
    if (profileName) {
      profileName.textContent = this.artist.name;
    }

    // Update star rating
    const starRating = document.getElementById('star-rating');
    if (starRating) {
      starRating.textContent = '★'.repeat(Math.min(Math.max(this.artist.rating || 3, 0), 5));
    }

    // Update location
    const location = document.getElementById('location');
    if (location) {
      location.textContent = this.artist.location;
    }

    // Update price
    const price = document.getElementById('price');
    if (price) {
      price.textContent = `${this.formatPrice(this.artist.price)} ₮`;
    }

    // Update description
    const description = document.querySelector('#description p');
    if (description) {
      description.textContent = this.artist.description;
    }

    // Update like button
    const likeButton = document.getElementById('like-button');
    if (likeButton) {
      likeButton.textContent = `Талагдсан (${this.artist.likes || 0})`;
    }

    // Update video source if available
    const video = document.querySelector('video source');
    if (video && this.artist.video) {
      video.src = this.artist.video;
      video.parentElement.load(); // Reload the video element
    }

    // Update document title
    document.title = `${this.artist.name} - Solned`;
  }

  setupMediaControls() {
    const mediaButtons = document.querySelectorAll('.media-button');
    const videoContainer = document.querySelector('#video-container');

    mediaButtons.forEach(button => {
      button.addEventListener('click', () => {
        mediaButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        switch (button.id) {
          case 'media-button-video':
            videoContainer.innerHTML = `
              <video controls>
                <source src="${this.artist?.video || '#'}" type="video/mp4">
                <p>Your browser doesn't support HTML5 video.</p>
              </video>`;
            break;
          case 'media-button-images':
            videoContainer.innerHTML = `
              <div class="image-gallery">
                <img src="${this.artist?.image || './picture/default.png'}" alt="${this.artist?.name || 'Artist'}" />
              </div>`;
            break;
          case 'media-button-audio':
            videoContainer.innerHTML = `
              <audio controls>
                <source src="${this.artist?.audio || '#'}" type="audio/mpeg">
                <p>Your browser doesn't support HTML5 audio.</p>
              </audio>`;
            break;
        }
      });
    });
  }

  setupEventListeners() {
    // Setup like button functionality
    const likeButton = document.getElementById('like-button');
    if (likeButton) {
      likeButton.addEventListener('click', (e) => {
        e.preventDefault();
        // Here you would typically make an API call to update likes
        console.log('Like clicked for artist:', this.artist?.id);
      });
    }

    // Setup order button functionality
    const orderButton = document.getElementById('order-button');
    if (orderButton) {
      orderButton.addEventListener('click', (e) => {
        if (!this.artist) return;
        // You might want to pass the artist ID to the order page
        window.location.href = `get-order.html?id=${this.artist.id}`;
      });
    }

    // Setup schedule button functionality
    const scheduleButton = document.getElementById('schedule-button');
    if (scheduleButton) {
      scheduleButton.addEventListener('click', (e) => {
        e.preventDefault();
        // Here you would typically show a schedule modal or navigate to a schedule page
        console.log('Schedule clicked for artist:', this.artist?.id);
      });
    }
  }

  formatPrice(price) {
    return new Intl.NumberFormat('mn-MN').format(Math.floor(price));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ArtistDetailManager();
});

export default ArtistDetailManager;