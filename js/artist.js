class ArtistManager {
  constructor() {
    // API URL
    this.apiUrl = 'https://api.jsonbin.io/v3/qs/6759b63fe41b4d34e463bae6';

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
    document.querySelectorAll('.dropdown-content a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const filterType = e.target.closest('.dropdown').querySelector('.dropbtn').textContent.trim();
        const value = e.target.textContent.trim();

        this.updateFilters(filterType, value);
      });
    });

    // Search input handler - Fixed version
    const searchInput = document.getElementById('search');
    if (searchInput) {
      searchInput.addEventListener('input', this.debounce((e) => {
        const searchTerm = e.target.value.trim();
        const params = new URLSearchParams(window.location.search);

        if (searchTerm) {
          params.set('search', searchTerm);
        } else {
          params.delete('search');
        }

        window.history.pushState({}, '', `${window.location.pathname}?${params}`);
        this.filterArtists({ search: searchTerm });
      }, 300));
    }
  }

  filterArtists(filters = {}) {
    console.log('Applying filters:', filters);
    let filtered = [...this.artists];

    // Refined search filter implementation
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase().trim();
      filtered = filtered.filter(artist => {
        return (
          artist.name?.toLowerCase().includes(searchTerm) ||
          artist.category?.toLowerCase().includes(searchTerm) ||
          artist.location?.toLowerCase().includes(searchTerm)
        );
      });
    }

    // Apply other filters
    if (filters.category) {
      filtered = filtered.filter(artist => artist.category === filters.category);
    }

    if (filters.price) {
      const priceRanges = {
        '0-1,000,000': [0, 1000000],
        '1,000,000-2,000,000': [1000000, 2000000],
        '2,000,000-2,500,000': [2000000, 2500000],
        '2,500,000-дээш': [2500000, Infinity],
      };

      if (filters.price) {
        const [min, max] = priceRanges[filters.price] || [0, Infinity];
        filtered = filtered.filter(artist => artist.price >= min && artist.price <= max);
      }


    }

    if (filters.location) {
      filtered = filtered.filter(artist => artist.location === filters.location);
    }

    console.log('Filtered results:', filtered);
    this.renderArtists(filtered);
  }

  // Хайлтын хугацаа хойшлуулах функц
  debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  updateFilters(filterType, value) {
    const params = new URLSearchParams(window.location.search);
    let paramKey = '';

    switch (filterType) {
      case 'Төрлүүд':
        paramKey = 'category';
        // Илүү уян хатан категорийн шилжүүлэг
        const categoryMap = {
          'Дуучин': 'singer',
          'Хамтлаг': 'band',
          'Хөгжимчин': 'musician',
          'Хөтлөгч': 'host',
          'Комедиан': 'comedian',
          'Бүжигчин': 'dancer'
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
    switch (filterType) {
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

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase().trim();
      filtered = filtered.filter(artist =>
        artist.name?.toLowerCase().includes(searchTerm) ||
        artist.category?.toLowerCase().includes(searchTerm) ||
        artist.location?.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.category) {
      filtered = filtered.filter(artist => artist.category === filters.category);
    }

    if (filters.price) {
      const priceRanges = {
        '0-1,000,000': [0, 1000000],
        '1,000,000-2,000,000': [1000000, 2000000],
        '2,000,000-2,500,000': [2000000, 2500000],
        '2,500,000-дээш': [2500000, Infinity],
      };

      const [min, max] = priceRanges[filters.price] || [0, Infinity];
      filtered = filtered.filter(artist => artist.price >= min && artist.price <= max);
    }

    if (filters.location) {
      filtered = filtered.filter(artist => artist.location === filters.location);
    }

    console.log('Filtered results:', filtered);

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

    this.renderArtists(filtered);
  }

  updateFilters(filterType, value) {
    const params = new URLSearchParams(window.location.search);
    const filterMappings = {
      'Төрлүүд': {
        paramKey: 'category',
        mapping: {
          'Дуучин': 'singer',
          'Хамтлаг': 'band',
          'Хөгжимчин': 'musician',
          'Хөтлөгч': 'host',
          'Комедиан': 'comedian',
          'Бүжигчин': 'dancer',
        },
      },
      'Үнэ': {
        paramKey: 'price',
        mapping: null, // No additional mapping needed for price
      },
      'Байршил': {
        paramKey: 'location',
        mapping: null,
      },
    };

    const filterConfig = filterMappings[filterType];
    if (!filterConfig) return;

    const mappedValue = filterConfig.mapping
      ? filterConfig.mapping[value] || value
      : value;

    params.set(filterConfig.paramKey, mappedValue);

    this.activeFilters.set(filterType, value);
    this.updateFilterTags();

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
      'musician': 'Хөгжимчин',
      'host': 'Хөтлөгч',
      'comedian': 'Комедиан',
      'dancer': 'Бүжигчин'
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
    window.location.href = `Sanalhuselt.html?artist=${artistId}`;
  }
}

// Хуудас ачаалагдахад ArtistManager-г инстанслах
document.addEventListener('DOMContentLoaded', () => {
  new ArtistManager();
});

export default ArtistManager;
