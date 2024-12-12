class ArtistClickHandler {
  constructor() {
    // Store artists data
    this.artists = [];
    this.init();
  }

  async init() {
    try {
      // Use the same API URL as in the original code
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
    // Select all product cards in the marketplace container
    const productCards = document.querySelectorAll('.marketplace-container .product-card');
    
    productCards.forEach(card => {
      card.addEventListener('click', (event) => {
        // Don't trigger if clicking the order button
        if (!event.target.classList.contains('order-button')) {
          const artistName = card.querySelector('.product-title').textContent;
          this.handleArtistClick(artistName);
        }
      });
    });
  }

  handleArtistClick(artistName) {
    // Find the artist by name
    const artist = this.artists.find(a => a.name === artistName);
    
    if (artist) {
      // Navigate to sanalhuselt.html with the artist ID
      window.location.href = `Sanalhuselt.html?artist=${artist.id}`;
    } else {
      console.error('Artist not found:', artistName);
    }
  }

  // Method to update click handlers after filtering
  updateClickHandlers() {
    this.setupClickHandlers();
  }
}

// Initialize the handler when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const clickHandler = new ArtistClickHandler();
  
  // Add the click handler as a property to the ArtistManager instance
  const artistManager = window.artistManager || new ArtistManager();
  artistManager.clickHandler = clickHandler;
  
  // Modify the original renderArtists method to update click handlers
  const originalRenderArtists = artistManager.renderArtists;
  artistManager.renderArtists = function(artists) {
    originalRenderArtists.call(this, artists);
    this.clickHandler.updateClickHandlers();
  };
});

export default ArtistClickHandler;