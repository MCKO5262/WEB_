// models/Artist.js
export class ArtistModel {
    constructor(data) {
      this._data = data;
    }
  
    get id() { return this._data.id; }
    get name() { return this._data.name; }
    get image() { return this._data.image; }
    get likes() { return this._data.likes; }
    get bookings() { return this._data.bookings; }
    get location() { return this._data.location; }
    get category() { return this._data.category; }
    get price() { return this._data.price; }
    get video() { return this._data.video; }
    get audio() { return this._data.audio; }
    get description() { return this._data.description; }
  
    toJSON() {
      return { ...this._data };
    }
  
    static fromJSON(json) {
      return new ArtistModel(json);
    }
  }
  
  // services/ArtistService.js
  export class ArtistService {
    constructor(apiUrl = '/api/artists') {
      this.apiUrl = apiUrl;
      this.artists = new Map();
    }
  
    async fetchAllArtists() {
      try {
        const response = await fetch(this.apiUrl);
        if (!response.ok) throw new Error('Failed to fetch artists');
        
        const data = await response.json();
        data.forEach(artist => {
          this.artists.set(artist.id, ArtistModel.fromJSON(artist));
        });
        
        return Array.from(this.artists.values());
      } catch (error) {
        console.error('Error fetching artists:', error);
        throw error;
      }
    }
  
    async getArtistById(id) {
      if (!this.artists.has(id)) {
        try {
          const response = await fetch(`${this.apiUrl}/${id}`);
          if (!response.ok) throw new Error('Artist not found');
          
          const data = await response.json();
          this.artists.set(id, ArtistModel.fromJSON(data));
        } catch (error) {
          console.error(`Error fetching artist ${id}:`, error);
          throw error;
        }
      }
      return this.artists.get(id);
    }
  
    async filterArtists(criteria) {
      const artists = Array.from(this.artists.values());
      return artists.filter(artist => {
        return Object.entries(criteria).every(([key, value]) => {
          return artist[key] === value;
        });
      });
    }
  
    async searchArtists(query) {
      const artists = Array.from(this.artists.values());
      const searchTerm = query.toLowerCase();
      
      return artists.filter(artist => 
        artist.name.toLowerCase().includes(searchTerm) ||
        artist.description.toLowerCase().includes(searchTerm) ||
        artist.location.toLowerCase().includes(searchTerm)
      );
    }
  }
  
  // services/BookingService.js
  export class BookingService {
    constructor(apiUrl = '/api/bookings') {
      this.apiUrl = apiUrl;
    }
  
    async bookArtist(artistId, bookingDetails) {
      try {
        const response = await fetch(`${this.apiUrl}/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            artistId,
            ...bookingDetails
          })
        });
  
        if (!response.ok) throw new Error('Booking failed');
        return true;
      } catch (error) {
        console.error('Error booking artist:', error);
        throw error;
      }
    }
  }
  
  // services/DataService.js
  export class DataService {
    constructor() {
      this.data = [
        {
          "id": 1,
          "name": "Davai-Dasha",
          "image": "./picture/davaidasha.png",
          "likes": 1231,
          "bookings": 133,
          "location": "Ховд",
          "category": "singer",
          "price": 1500007,
          "video": "./video/#",
          "audio": "./audio/#",
          "description": "Davaidasha, whose real name is Ariunbold Ganbold, is a Mongolian pop singer and songwriter born on June 11, 2001, in Erdenet, Mongolia. Known for his blend of styles in bedroom pop and emo rap, he began releasing music independently around 2020. His stage name, derived from the Mongolian name Davaadash, reflects his unique artistic identity."
        },
        // ... other data entries ...
      ];
    }
  
    async getAllArtists() {
      // Simulate API call
      return new Promise(resolve => {
        setTimeout(() => resolve(this.data), 100);
      });
    }
  
    async getArtistById(id) {
      return new Promise(resolve => {
        const artist = this.data.find(a => a.id === id);
        setTimeout(() => resolve(artist), 100);
      });
    }
  }
  
  // example-usage.js
  async function main() {
    const artistService = new ArtistService();
    const bookingService = new BookingService();
  
    try {
      // Fetch all artists
      const artists = await artistService.fetchAllArtists();
      console.log('All artists:', artists);
      
      // Get specific artist
      const thunder = await artistService.getArtistById(3);
      console.log('Thunder:', thunder);
      
      // Filter bands in Ulaanbaatar
      const ulaanbaatarBands = await artistService.filterArtists({
        location: 'Улаан-Баатар',
        category: 'band'
      });
      console.log('Ulaanbaatar bands:', ulaanbaatarBands);
      
      // Search artists
      const searchResults = await artistService.searchArtists('Thunder');
      console.log('Search results:', searchResults);
      
      // Book an artist
      if (thunder) {
        const booked = await bookingService.bookArtist(thunder.id, {
          date: new Date('2024-12-25'),
          duration: 2,
          location: 'Дархан',
          eventType: 'concert'
        });
        console.log('Booking successful:', booked);
      }
      
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // To use in browser:
  // import { ArtistService, BookingService } from './services/index.js';
  // main();