class ArtistManager {
  constructor() {
    // API URL
    this.apiUrl = 'https://api.jsonbin.io/v3/qs/6746d17dacd3cb34a8afa860';
    
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
      // Зөв өгөгдлийн бүтэц болох талаар шалгах
      if (!Array.isArray(data.record)) {
        throw new Error('Invalid data structure');
      }
      
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
            <p>Алдаа: ${error.message}</p>
          </div>
        `;
      }
    }
  }

  setupFilterTagsContainer() {
    // Шүүлтүүрийн tag-уудын контейнер үүсгэх
    if (!document.querySelector('.active-filters')) {
      const navbar = document.querySelector('.navbar') || document.querySelector('.nav-items');
      if (navbar) {
        const container = document.createElement('div');
        container.className = 'active-filters';
        navbar.insertAdjacentElement('afterend', container);
      }
    }
  }

  setupFilters() {
    // Dropdown шүүлтүүрүүдийг тохируулах
    document.querySelectorAll('.dropdown-content a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const filterType = e.target.closest('.dropdown').querySelector('.dropbtn, .dropdown') 
          ? e.target.closest('.dropdown').querySelector('.dropbtn, .dropdown').textContent 
          : 'Unknown';
        const value = e.target.textContent;
        
        this.updateFilters(filterType, value);
      });
    });

    // Хайлтын өгөгдөл оруулах талбар
    const searchInput = document.getElementById('search');
    if (searchInput) {
      searchInput.addEventListener('input', this.debounce((e) => {
        this.filterArtists({ search: e.target.value });
      }, 300));
    }
  }

  // Хайлтын хугацаа хойшлуулах функц
  debounce(func, delay) {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  updateFilters(filterType, value) {
    const params = new URLSearchParams(window.location.search);
    let paramKey = '';
    
    switch(filterType) {
      case 'Төрлүүд':
        paramKey = 'category';
        // Илүү уян хатан категорийн шилжүүлэг
        const categoryMap = {
          'Дуучин': 'singer', 
          'Хамтлаг': 'band',
          'Хөгжимчин': 'musician'
        };
        params.set(paramKey, categoryMap[value] || value);
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

    // Идэвхтэй шүүлтүүрийг шинэчлэх
    this.activeFilters.set(filterType, value);
    this.updateFilterTags();

    // URL-г шинэчлэх 
    window.history.pushState({}, '', `${window.location.pathname}?${params}`);
    this.applyURLFilters();
  }

  updateFilterTags() {
    const container = document.querySelector('.active-filters');
    if (!container) return;

    container.innerHTML = '';

    this.activeFilters.forEach((value, type) => {
      const tag = document.createElement('span');
      tag.className = 'filter-tag';
      tag.innerHTML = `
        ${value}
        <button class="remove-filter" data-type="${type}">×</button>
      `;
      container.appendChild(tag);

      // Шүүлтийн тэмдэгийг хасах үйлдэл
      tag.querySelector('.remove-filter').addEventListener('click', () => {
        this.removeFilter(type);
      });
    });
  }

  removeFilter(filterType) {
    const params = new URLSearchParams(window.location.search);
    
    this.activeFilters.delete(filterType);
    
    // URL-с параметрыг хасах
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
  
    // Нэг бүрчлэн шүүлт хийх нарийвчилсан алгоритм
    const applyFilter = (artists, filterKey, filterValue) => {
      if (!filterValue) return artists;
  
      switch(filterKey) {
        case 'category':
          return artists.filter(artist => artist.category === filterValue);
        
        case 'price':
          const priceRanges = {
            '0=100000': [0, 100000],
            '100000-2000000': [100000, 2000000],
            '2000000-': [2000000, Infinity]
          };
          
          const [min, max] = priceRanges[filterValue] || [0, Infinity];
          return artists.filter(artist => 
            artist.price >= min && artist.price <= max
          );
        
        case 'location':
          return artists.filter(artist => artist.location === filterValue);
        
        case 'search':
          const searchTerm = filterValue.toLowerCase().trim();
          return artists.filter(artist =>
            artist.name.toLowerCase().includes(searchTerm) ||
            artist.category.toLowerCase().includes(searchTerm) ||
            artist.location.toLowerCase().includes(searchTerm)
          );
        
        default:
          return artists;
      }
    };
  
    // Бүх идэвхтэй шүүлтүүдийг дарааллаар нь хэрэгжүүлэх
    const filterKeys = ['category', 'price', 'location', 'search'];
    filterKeys.forEach(key => {
      if (filters[key]) {
        filtered = applyFilter(filtered, key, filters[key]);
      }
    });
  
    console.log('Filtered results:', filtered);
  
    // Хэрэв шүүлтийн дараа өгөгдөл олдохгүй бол анхны өгөгдлийг харуулах
    if (filtered.length === 0) {
      const container = document.querySelector('.marketplace-container');
      if (container) {
        container.innerHTML = `
          <div class="no-results">
            <p>Таны хайсан өгөгдөл олдсонгүй. Шүүлтийг цэвэрлэнэ үү.</p>
          </div>
        `;
      }
      return;
    }
  
    // Шүүгдсэн өгөгдлийг дэлгэцэнд харуулах
    this.renderArtists(filtered);
  }
  updateFilters(filterType, value) {
    const params = new URLSearchParams(window.location.search);
    let paramKey = '';
    
    // Төрөл, үнэ, байршлын Map 
    const filterMappings = {
      'Төрлүүд': {
        paramKey: 'category',
        mapping: {
          'Дуучин': 'singer', 
          'Хамтлаг': 'band',
          'Хөгжимчин': 'musician'
        }
      },
      'Үнэ': {
        paramKey: 'price',
        mapping: null
      },
      'Байршил': {
        paramKey: 'location',
        mapping: null
      }
    };
  
    const filterConfig = filterMappings[filterType];
    if (!filterConfig) return;
  
    // Параметрийг шинэчлэх
    const mappedValue = filterConfig.mapping 
      ? (filterConfig.mapping[value] || value)
      : value;
    
    params.set(filterConfig.paramKey, mappedValue);
  
    // Идэвхтэй шүүлтүүрийг шинэчлэх
    this.activeFilters.set(filterType, value);
    this.updateFilterTags();
  
    // URL-г шинэчлэх 
    window.history.pushState({}, '', `${window.location.pathname}?${params}`);
    this.applyURLFilters();
  }

  renderArtists(artists) {
    const container = document.querySelector('.marketplace-container');
    if (!container) {
      console.error('Container element not found!');
      return;
    }

    // Хэрэв шүүлтийн дараа өгөгдөл олдохгүй бол анхны өгөгдлийг харуулах
    if (artists.length === 0) {
      container.innerHTML = `
        <div class="no-results">
          <p>Таны хайсан өгөгдөл олдсонгүй. Шүүлтийг цэвэрлэнэ үү.</p>
        </div>
      `;
      return;
    }

    const artistsHTML = artists.map(artist => `
      <article class="product-card">
        <div class="product-image">
          <img src="${artist.image || './picture/default.png'}" 
               alt="${artist.name}" 
               onerror="this.src='./picture/default.png'">
        </div>
        <h3 class="product-title">${artist.name}</h3>
        <section class="product-info">
          <p class="rating">${this.generateStarRating(artist.rating || 3)}</p>
          <p class="product-location">${artist.location} </p>
          <p class="product-category">${this.formatCategory(artist.category)}</p>
          <p class="price">${this.formatPrice(artist.price)}₮</p>
        </section>
        <button class="order-button" data-artist-id="${artist.id}">Захиалга өгөх</button>
      </article>
    `).join('');

    container.innerHTML = artistsHTML;

    // Захиалга өгөх товч дээр үйлдэл
    document.querySelectorAll('.order-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const artistId = e.target.dataset.artistId;
        this.handleBooking(artistId);
      });
    });
  }

  // Үнийн дүнг форматлах
  formatPrice(price) {
    return new Intl.NumberFormat('mn-MN').format(Math.floor(price));
  }

  // Категорийг монгол хэл дээр харуулах
  formatCategory(category) {
    const categories = {
      'singer': 'Дуучин',
      'band': 'Хамтлаг',
      'musician': 'Хөгжимчин'
    };
    return categories[category] || category;
  }

  // Үнэлгээний одыг үүсгэх
  generateStarRating(rating = 5) {
    const fullStar = '⭐';
    return fullStar.repeat(Math.min(Math.max(rating, 0), 5));
  }

  // Захиалга өгөх үйлдэл
  handleBooking(artistId) {
    // Захиалгын хуудас руу шилжих
    window.location.href = `ordercheck.html?artist=${artistId}`;
  }
}

// Хуудас ачаалагдахад ArtistManager-г инстанслах
document.addEventListener('DOMContentLoaded', () => {
  new ArtistManager();
});

export default ArtistManager;
