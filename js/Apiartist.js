class ApiService {
    constructor() {
      this.apiUrl = 'https://api.jsonbin.io/v3/qs/6777a2daad19ca34f8e4f58c'; // Unified API endpoint
    }
  
    async fetchArtists() {
      try {
        const response = await fetch(this.apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: AbortSignal.timeout(10000), // 10 seconds timeout
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
  