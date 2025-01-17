import ApiService from './Apiartist.js';

class ArtistDetailManager {
  constructor() {
    this.artist = null;
    this.init();
  }

  getArtistIdFromUrl() {
    const url = window.location.href;
    console.log('Current URL:', url);
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    console.log('Artist ID from URL:', id); 
    return id;
  }

  async init() {
    try {
      const artistId = parseInt(this.getArtistIdFromUrl(), 10);
      if (!artistId) {
        console.error('baihgue artist id');
        return;
      }

      sessionStorage.setItem('currentArtistId', artistId);

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
        console.error('Artist baihgue');
        return;
      }

      this.updatePageContent();
    } catch (error) {
      console.error('fetch hiisengue :', error);
    }
  }

  updatePageContent() {
    if (!this.artist) return;

    const profileImage = document.getElementById('profile-image');
    if (profileImage) {
      profileImage.src = this.artist.image || './picture/default.png';
      profileImage.onerror = () => {
        profileImage.src = './picture/default.png';
      };
    }

    const profileName = document.getElementById('profile-name');
    if (profileName) {
      profileName.textContent = this.artist.name;
    }

    const location = document.getElementById('location');
    if (location) {
      location.textContent = this.artist.location;
    }

    const price = document.getElementById('price');
    if (price) {
      price.textContent = `💵 ${this.formatPrice(this.artist.price)} ₮`;
    }

    const description = document.querySelector('#description p');
    if (description) {
      description.textContent = this.artist.description;
    }

    const likeButton = document.getElementById('like-button');
    if (likeButton) {
      likeButton.textContent = ` 💖 Талагдсан (${this.artist.likes || 0})`;
    }

    const video = document.querySelector('video source');
    if (video && this.artist.video) {
      video.src = this.artist.video;
      video.parentElement.load(); 
    }

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
    const likeButton = document.getElementById('like-button');
    if (likeButton) {
      likeButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (!this.artist) return;
        
        this.artist.likes++;
        likeButton.textContent = `💖 Талагдсан (${this.artist.likes})`;
      });
    }

    const orderButton = document.getElementById('order-button');
    if (orderButton) {
      orderButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (!this.artist) return;
        window.location.href = `get-order.html?id=${this.artist.id}`;
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
