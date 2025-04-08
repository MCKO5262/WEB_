class ApiService {
    constructor() {
      this.apiUrl = 'https://api.jsonbin.io/v3/qs/67d8e0a98561e97a50ee3f62';
    }
  
    async fetchArtists() {
      try {
        const response = await fetch(this.apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: AbortSignal.timeout(10000),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
  
        const data = await response.json();
        return data.record || [];
      } catch (error) {
        console.error('Error fetching data from API:', error);
        throw error;
      }
    }
  }
  
  export default new ApiService();
  