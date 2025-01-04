import ApiService from './Apiartist.js';

class ArtistDetailManager {
  constructor() {
    this.artist = null;
    this.init();
  }

  async init() {
    try {
      const artistId = this.getArtistIdFromUrl();
      if (!artistId) throw new Error('No artist ID found in URL');

      await this.fetchAndDisplayArtist(artistId);
      this.setupEventListeners();
    } catch (error) {
      console.error('Initialization error:', error);
    }
  }

  getArtistIdFromUrl() {
    return new URLSearchParams(window.location.search).get('id');
  }

  async fetchAndDisplayArtist(artistId) {
    try {
      const artists = await ApiService.fetchArtists();
      this.artist = artists.find(artist => artist.id === +artistId);
      if (!this.artist) throw new Error('Artist not found');

      this.updatePageContent();
    } catch (error) {
      console.error('Error fetching artist:', error);
    }
  }

  updatePageContent() {
    if (!this.artist) return;

    this.setElementContent('profile-image', 'src', this.artist.image, './picture/default.png');
    this.setElementContent('profile-name', 'textContent', this.artist.name);
    this.setElementContent('star-rating', 'textContent', '★'.repeat(Math.min(this.artist.rating || 3, 5)));
    this.setElementContent('location', 'textContent', this.artist.location);
    this.setElementContent('price', 'textContent', `${this.formatPrice(this.artist.price)} ₮`);
    this.setElementContent('description p', 'textContent', this.artist.description);
    this.setElementContent('like-button', 'textContent', `Талагдсан (${this.artist.likes || 0})`);

    if (this.artist.video) this.setMedia('video', this.artist.video);
    document.title = `${this.artist.name} - Solned`;
  }

  setElementContent(selector, property, value, fallback = '') {
    const element = document.querySelector(`#${selector}`);
    if (element) {
      element[property] = value || fallback;
      if (property === 'src' && element.onerror) {
        element.onerror = () => element.src = fallback;
      }
    }
  }

  setMedia(type, src) {
    const videoContainer = document.querySelector('#video-container');
    if (!videoContainer) return;

    const media = type === 'video' ? `<video controls><source src="${src}" type="video/mp4"></video>` : 
                  type === 'audio' ? `<audio controls><source src="${src}" type="audio/mpeg"></audio>` : 
                  `<img src="${src}" alt="${this.artist.name || 'Artist'}"/>`;
    videoContainer.innerHTML = media;
  }

  setupEventListeners() {
    const likeButton = document.getElementById('like-button');
    if (likeButton) {
      likeButton.addEventListener('click', e => {
        e.preventDefault();
        if (this.artist && !likeButton.disabled) {
          this.artist.likes = (this.artist.likes || 0) + 1;
          console.log('Like clicked for artist:', this.artist.id);
          likeButton.textContent = `Талагдсан (${this.artist.likes})`;
  
          likeButton.disabled = true;
        }
      });
    }
  
    this.setupButton('order-button', id => `get-order.html?id=${id}`);
    this.setupButton('schedule-button', () => {
      console.log('Schedule clicked for artist:', this.artist?.id);
    });
  }
  

  setupButton(buttonId, callback) {
    document.getElementById(buttonId)?.addEventListener('click', e => {
      if (this.artist) window.location.href = callback(this.artist.id);
    });
  }

  formatPrice(price) {
    return new Intl.NumberFormat('mn-MN').format(Math.floor(price));
  }
}

document.addEventListener('DOMContentLoaded', () => new ArtistDetailManager());

export default ArtistDetailManager;
