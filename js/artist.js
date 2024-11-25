class ArtistManager {
  constructor() {
    // API URL
    this.apiUrl = 'https://api.jsonbin.io/v3/qs/674450b2e41b4d34e45a351e';
    
    this.artists = []; // Уран бүтээлчдийн жагсаалт
    this.activeFilters = new Map(); // Идэвхтэй шүүлтүүрүүд
    this.init();
  }
  async init() {
    try {
      // API-с өгөгдөл авах
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      this.artists = data.record; // API-с ирсэн өгөгдлийг artists массивт оноох
      
      console.log('Initialized with artists:', this.artists);

      // Шүүлтүүрийн tag-уудын контейнер үүсгэх
      this.setupFilterTagsContainer();
      
      // Уран бүтээлчдийг дэлгэцэнд харуулах
      this.renderArtists(this.artists);
      
      // Шүүлтүүрүүдийг тохируулах
      this.setupFilters();
      
      // URL дээрх шүүлтүүрүүдийг хэрэгжүүлэх 
      this.applyURLFilters();

    } catch (error) {
      console.error('Error initializing ArtistManager:', error);
      // Алдаа гарсан үед хэрэглэгчид мэдэгдэх
      const container = document.querySelector('.marketplace-container');
      if (container) {
        container.innerHTML = `
          <div class="error-message">
            <p>Өгөгдөл ачаалахад алдаа гарлаа. Та хуудсаа refresh хийнэ үү.</p>
          </div>
        `;
      }
    }
  
  }
  setupFilterTagsContainer() {
    // Create container for filter tags if it doesn't exist
    if (!document.querySelector('.active-filters')) {
      const navbar = document.querySelector('.navbar');
      const container = document.createElement('div');
      container.className = 'active-filters';
      navbar.insertAdjacentElement('afterend', container);
    }
  }

  setupFilters() {
    document.querySelectorAll('.dropdown-content a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const filterType = e.target.closest('.dropdown').querySelector('.dropbtn').textContent;
        const value = e.target.textContent;
        
        this.updateFilters(filterType, value);
      });
    });

    const searchInput = document.getElementById('search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filterArtists({ search: e.target.value });
      });
    }
  }

  updateFilters(filterType, value) {
    const params = new URLSearchParams(window.location.search);
    let paramKey = '';
    
    switch(filterType) {
      case 'Төрлүүд':
        paramKey = 'category';
        params.set(paramKey, value === 'Дуучин' ? 'singer' : 'band');
        break;
      case 'Үнэ':
        paramKey = 'price';
        params.set(paramKey, value);
        break;
      case 'Байршил':
        paramKey = 'location';
        params.set(paramKey, value);
        break;
      default:
        return;
    }

    // Update active filters
    this.activeFilters.set(filterType, value);
    this.updateFilterTags();

    window.history.pushState({}, '', `${window.location.pathname}?${params}`);
    this.applyURLFilters();
  }

  updateFilterTags() {
    const container = document.querySelector('.active-filters');
    if (!container) return;

    // Clear existing tags
    container.innerHTML = '';

    // Create tag for each active filter
    this.activeFilters.forEach((value, type) => {
      const tag = document.createElement('span');
      tag.className = 'filter-tag';
      tag.innerHTML = `
        ${value}
        <button class="remove-filter" data-type="${type}">×</button>
      `;
      container.appendChild(tag);

      // Add click handler for remove button
      tag.querySelector('.remove-filter').addEventListener('click', () => {
        this.removeFilter(type);
      });
    });
  }

  removeFilter(filterType) {
    const params = new URLSearchParams(window.location.search);
    
    // Remove from active filters
    this.activeFilters.delete(filterType);
    
    // Remove from URL params
    switch(filterType) {
      case 'Төрлүүд':
        params.delete('category');
        break;
      case 'Үнэ':
        params.delete('price');
        break;
      case 'Байршил':
        params.delete('location');
        break;
    }

    // Update URL and filter tags
    window.history.pushState({}, '', `${window.location.pathname}?${params}`);
    this.updateFilterTags();
    this.applyURLFilters();
  }

  applyURLFilters() {
    const params = new URLSearchParams(window.location.search);
    const filters = {
      category: params.get('category'),
      price: params.get('price'),
      location: params.get('location'),
      search: params.get('search')
    };

    this.filterArtists(filters);
  }

  filterArtists(filters = {}) {
    console.log('Applying filters:', filters);
    let filtered = [...this.artists];

    if (filters.category) {
      filtered = filtered.filter(artist => artist.category === filters.category);
    }

    if (filters.price) {
      const priceRanges = {
        '0=100000': [0, 100000],
        '100000-2000000': [100000, 2000000],
        '2000000-': [2000000, Infinity]
      };
      
      const [min, max] = priceRanges[filters.price] || [0, Infinity];
      filtered = filtered.filter(artist => 
        artist.price >= min && artist.price <= max
      );
    }

    if (filters.location) {
      filtered = filtered.filter(artist => 
        artist.location === filters.location
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm) ||
        artist.category.toLowerCase().includes(searchTerm) ||
        artist.location.toLowerCase().includes(searchTerm)
      );
    }

    console.log('Filtered results:', filtered);
    this.renderArtists(filtered);
  }

  renderArtists(artists) {
    const container = document.querySelector('.marketplace-container');
    if (!container) {
      console.error('Container element not found!');
      return;
    }

    console.log('Rendering artists:', artists);
    
    const artistsHTML = artists.map(artist => `
      <article class="product-card">
        <div class="product-image">
          <img src="${artist.image}" alt="${artist.name}" onerror="this.src='./picture/default.png'">
        </div>
        <h3 class="product-title">${artist.name}</h3>
        <section class="product-info">
          <p class="rating"> ⭐⭐⭐ </p>
          <p class="product-category"> ${artist.location} </p>
          <p class="product-category">${this.formatCategory(artist.category)}</p>
          <p class="price">${this.formatPrice(artist.price)}₮</p>
        </section>
        <button class="order-button" data-artist-id="${artist.id}">Захиалга өгөх</button>
      </article>
    `).join('');

    container.innerHTML = artistsHTML;

    document.querySelectorAll('.order-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const artistId = e.target.dataset.artistId;
        this.handleBooking(artistId);
      });
    });
  }

  formatCategory(category) {
    const categories = {
      'singer': 'Дуучин',
      'band': 'Хамтлаг'
    };
    return categories[category] || category;
  }

  formatPrice(price) {
    return new Intl.NumberFormat('mn-MN').format(price);
  }

  handleBooking(artistId) {
    window.location.href = `ordercheck.html?artist=${artistId}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ArtistManager();
});

export default ArtistManager;