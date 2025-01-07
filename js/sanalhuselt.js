import ApiService from './Apiartist.js';

class ArtistDetailManager {
  constructor() {
    this.artist = null;
    this.init();
  }

  getArtistIdFromUrl() {
    // Log the full URL for debugging
    const url = window.location.href;
    console.log('Current URL:', url);

    const params = new URLSearchParams(window.location.search);
    console.log('URL Parameters:', Array.from(params.entries())); // Log all parameters

    const id = params.get('id');
    console.log('Artist ID from URL:', id); // Log the parsed artist ID
    return id;
  }

  async init() {
    try {
      const artistId = parseInt(this.getArtistIdFromUrl(), 10);

      // Check if the artistId is valid
      if (!artistId || isNaN(artistId)) {
        console.error('No valid artist ID found in URL');
        alert('Invalid or missing artist ID. Please check the URL.');
        return;
      }

      sessionStorage.setItem('currentArtistId', artistId);
      console.log('Stored Artist ID:', sessionStorage.getItem('currentArtistId'));

      await this.fetchAndDisplayArtist(artistId);
      this.setupMediaControls();
      this.setupEventListeners();
    } catch (error) {
      console.error('Error initializing artist detail page:', error);
    }
  }

  async fetchAndDisplayArtist(artistId) {
    try {
      const artists = await ApiService.fetchArtists();
      this.artist = artists.find(artist => artist.id === artistId);

      if (!this.artist) {
        console.error('Artist not found');
        alert('Artist not found. Please check the ID in the URL.');
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
      profileImage.src = this.artist.image || './picture/default.png';
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
      likeButton.addEventListener('click', async (e) => {
        e.preventDefault();
        if (!this.artist) return;
        try {
          const response = await ApiService.updateArtistLikes(this.artist.id);
          this.artist.likes = response.likes; // Assuming the response contains updated likes count
          likeButton.textContent = `Талагдсан (${this.artist.likes})`;
        } catch (error) {
          console.error('Error liking artist:', error);
        }
      });
    }

    // Setup order button functionality
    const orderButton = document.getElementById('order-button');
    if (orderButton) {
      orderButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (!this.artist) return;
        window.location.href = `get-order.html?id=${this.artist.id}`;
      });
    }

    // Setup schedule button functionality
    const scheduleButton = document.getElementById('schedule-button');
    if (scheduleButton) {
      scheduleButton.addEventListener('click', (e) => {
        e.preventDefault();
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
