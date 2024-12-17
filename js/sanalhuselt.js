import ArtistDetailManager from './Apiartist.js';
export default class ArtistDetailManager {
  constructor() {
    this.currentArtist = null;
    this.mediaType = 'video';
    this.initialize();
  }

  async initialize() {
    try {
      await this.loadArtistData();
      this.setupEventListeners();
      this.updateUI();
      this.displaySanalhuseltPage(); // Add the call to display the suggestion page
    } catch (error) {
      console.error('Failed to initialize artist details:', error);
    }
  }

  async loadArtistData() {
    try {
      const artists = await ApiService.fetchArtists();
      const urlParams = new URLSearchParams(window.location.search);
      const artistId = parseInt(urlParams.get('id'), 10);
  
      this.currentArtist = artists.find(artist => artist.id === artistId);
  
      if (!this.currentArtist) {
        throw new Error('Artist not found');
      }
    } catch (error) {
      console.error('Error loading artist data:', error);
      this.handleError('Failed to load artist data');
    }
  }

  setupEventListeners() {
    document.getElementById('media-button-video').addEventListener('click', () => this.switchMediaType('video'));
    document.getElementById('media-button-images').addEventListener('click', () => this.switchMediaType('images'));
    document.getElementById('media-button-audio').addEventListener('click', () => this.switchMediaType('audio'));

    document.getElementById('like-button').addEventListener('click', () => this.handleLike());
  }

  switchMediaType(type) {
    this.mediaType = type;
    this.updateMediaButtons();
    this.updateMediaContent();
  }

  updateMediaButtons() {
    const buttons = document.querySelectorAll('.media-button');
    buttons.forEach(button => {
      button.classList.remove('active');
      if (button.id === `media-button-${this.mediaType}`) {
        button.classList.add('active');
      }
    });
  }

  updateMediaContent() {
    const container = document.getElementById('video-container');
    
    switch (this.mediaType) {
      case 'video':
        container.innerHTML = `<video controls><source src="${this.currentArtist.video}" type="video/mp4"></video>`;
        break;
      case 'audio':
        container.innerHTML = `<audio controls><source src="${this.currentArtist.audio}" type="audio/mpeg"></audio>`;
        break;
      case 'images':
        container.innerHTML = `<img src="${this.currentArtist.image}" alt="${this.currentArtist.name}" />`;
        break;
    }
  }

  updateUI() {
    if (!this.currentArtist) return;

    document.getElementById('profile-name').textContent = this.currentArtist.name;
    document.getElementById('profile-image').src = this.currentArtist.image;
    document.getElementById('location').textContent = this.currentArtist.location;
    document.getElementById('price').textContent = `${this.formatPrice(this.currentArtist.price)} ₮`;
    
    const descriptionElement = document.querySelector('#description p');
    if (descriptionElement) {
      descriptionElement.textContent = this.currentArtist.description;
    }

    this.updateMediaContent();
  }

  handleLike() {
    const likeButton = document.getElementById('like-button');
    likeButton.classList.toggle('liked');
    if (likeButton.classList.contains('liked')) {
      this.currentArtist.likes++;
    } else {
      this.currentArtist.likes--;
    }
  }

  formatPrice(price) {
    return new Intl.NumberFormat('mn-MN').format(price);
  }

  handleError(message) {
    const container = document.getElementById('container');
    container.innerHTML = `
      <div class="error-message">
        <h2>Error</h2>
        <p>${message}</p>
        <a href="/" class="btn">Return to Home</a>
      </div>
    `;
  }

  // New method to display the "sanalhuselt" (suggestions) page
  displaySanalhuseltPage() {
    if (!this.currentArtist) return;

    const suggestionSection = document.getElementById('sanalhuselt-section');
    
    // Assuming the suggestions are based on artist category or location
    const suggestions = this.getSuggestions(this.currentArtist);

    suggestionSection.innerHTML = suggestions.map(artist => `
      <div class="suggested-artist">
        <img src="${artist.image}" alt="${artist.name}" />
        <h3>${artist.name}</h3>
        <p>${artist.description}</p>
        <p>Location: ${artist.location}</p>
        <p>Price: ${this.formatPrice(artist.price)} ₮</p>
      </div>
    `).join('');
  }

  // Example method to fetch suggested artists (you can improve this logic based on your requirements)
  getSuggestions(currentArtist) {
    // For now, suggest artists from the same category or location
    return artists.filter(artist => artist.category === currentArtist.category || artist.location === currentArtist.location);
  }
}
