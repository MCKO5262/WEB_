class ArtistClickHandler {
  constructor() {
    // Store artists data
    this.artists = [];
    this.init();
  }

  async init() {
    try {
      const apiUrl = 'https://api.jsonbin.io/v3/qs/675a54dde41b4d34e463fd7b';
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      if (!Array.isArray(data.record)) {
        throw new Error('Invalid data structure');
      }

      this.artists = data.record;
      this.setupClickHandlers();
      
    } catch (error) {
      console.error('Error initializing ArtistClickHandler:', error);
    }
  }

  setupClickHandlers() {
    const productCards = document.querySelectorAll('.marketplace-container .product-card');
    
    productCards.forEach(card => {
      card.addEventListener('click', (event) => {
        if (!event.target.classList.contains('order-button')) {
          const artistName = card.querySelector('.product-title').textContent;
          this.handleArtistClick(artistName);
        }
      });
    });
  }

  handleArtistClick(artistName) {
    const artist = this.artists.find(a => a.name === artistName);
    
    if (artist) {
      window.location.href = `Sanalhuselt.html?artist=${artist.id}`;
    } else {
      console.error('Artist not found:', artistName);
    }
  }

  updateClickHandlers() {
    this.setupClickHandlers();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const clickHandler = new ArtistClickHandler();
  
  const artistManager = window.artistManager || new ArtistManager();
  artistManager.clickHandler = clickHandler;
  
  const originalRenderArtists = artistManager.renderArtists;
  artistManager.renderArtists = function(artists) {
    originalRenderArtists.call(this, artists);
    this.clickHandler.updateClickHandlers();
  };
});

export default ArtistClickHandler;