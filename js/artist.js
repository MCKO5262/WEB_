import ApiService from './Apiartist.js';

class ArtistManager {
  constructor() {
    this.artists = [];
    this.activeFilters = new Map();
    this.init();
  }
  

  async init() {
    try {
      this.artists = await ApiService.fetchArtists();
      console.log('Artists:', this.artists);

      this.setupFilterTagsContainer();
      this.renderArtists(this.artists);
      this.setupFilters();
      this.applyURLFilters();
      this.setupOrderButtons();
    } catch (error) {
      console.error('ArtistManager initialization error:', error);
    }
  }

  setupOrderButtons() {
    document.addEventListener('click', (e) => {
      const orderButton = e.target.closest('.order-button');
      if (orderButton) {
        const artistId = orderButton.closest('.product-card').querySelector('.product-title a').getAttribute('href').split('=')[1];
        if (artistId) {
          window.location.href = `get-order.html?id=${artistId}`;
        }
      }
    });
  }

  setupFilterTagsContainer() {
    const navbar = document.querySelector('.navbar') || document.querySelector('.nav-items');
    if (navbar && !document.querySelector('.active-filters')) {
      const container = document.createElement('div');
      container.className = 'active-filters';
      navbar.insertAdjacentElement('afterend', container);
    }
  }

  setupFilters() {
    document.querySelectorAll('.dropdown-content a').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const filterType = e.target.closest('.dropdown').querySelector('.dropbtn').textContent.trim();
        const value = e.target.textContent.trim();
        this.updateFilters(filterType, value);
      });
    });

    const searchInput = document.getElementById('search');
    if (searchInput) {
      searchInput.addEventListener(
        'input',
        this.debounce(e => {
          const searchTerm = e.target.value.trim();
          const params = new URLSearchParams(window.location.search);

          if (searchTerm) {
            params.set('search', searchTerm);
          } else {
            params.delete('search');
          }

          window.history.pushState({}, '', `${window.location.pathname}?${params}`);
          this.filterArtists({ search: searchTerm });
        }, 300)
      );
    }
  }

  debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  updateFilters(filterType, value) {
    const params = new URLSearchParams(window.location.search);
    const filterMappings = {
      'Төрлүүд': { paramKey: 'category', mapping: { 'Дуучин': 'singer', 'Хамтлаг': 'band', 'Хөгжимчин': 'musician', 'Хөтлөгч': 'host', 'Комедиан': 'comedian', 'Бүжигчин': 'dancer' } },
      'Үнэ': { paramKey: 'price', mapping: null },
      'Байршил': { paramKey: 'location', mapping: null },
    };

    const filterConfig = filterMappings[filterType];
    if (!filterConfig) return;

    const mappedValue = filterConfig.mapping ? filterConfig.mapping[value] || value : value;
    params.set(filterConfig.paramKey, mappedValue);

    this.activeFilters.set(filterType, value);
    this.updateFilterTags();
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
      tag.innerHTML = `${value} <button class="remove-filter" data-type="${type}">×</button>`;
      container.appendChild(tag);

      tag.querySelector('.remove-filter').addEventListener('click', () => {
        this.removeFilter(type);
      });
    });
  }

  removeFilter(filterType) {
    const params = new URLSearchParams(window.location.search);
    this.activeFilters.delete(filterType);
    if (filterType === 'Төрлүүд') params.delete('category');
    else if (filterType === 'Үнэ') params.delete('price');
    else if (filterType === 'Байршил') params.delete('location');

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
      search: params.get('search'),
    };
    this.filterArtists(filters);
  }

  filterArtists(filters = {}) {
    let filtered = [...this.artists];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase().trim();
      filtered = filtered.filter(artist =>
        artist.name?.toLowerCase().includes(searchTerm) ||
        artist.category?.toLowerCase().includes(searchTerm) ||
        artist.location?.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.category) filtered = filtered.filter(artist => artist.category === filters.category);
    if (filters.price) {
      const priceRanges = { '0-1,000,000': [0, 1000000], '1,000,000-2,000,000': [1000000, 2000000], '2,000,000-2,500,000': [2000000, 2500000], '2,500,000-дээш': [2500000, Infinity] };
      const [min, max] = priceRanges[filters.price] || [0, Infinity];
      filtered = filtered.filter(artist => artist.price >= min && artist.price <= max);
    }
    if (filters.location) filtered = filtered.filter(artist => artist.location === filters.location);

    this.renderArtists(filtered);
  }

  renderArtists(artists) {
    const container = document.querySelector('.marketplace-container');
    if (!container) return;

    if (artists.length === 0) {
      container.innerHTML = `<div class="no-results"><p>Таны хайсан өгөгдөл олдсонгүй. Шүүлтийг цэвэрлэнэ үү.</p></div>`;
      return;
    }

    container.innerHTML = artists
  .map(
    artist => `
    <article class="product-card">
      <div class="product-image">
        <a href="Sanalhuselt.html?id=${artist.id}">
          <img src="${artist.image || './picture/default.png'}" alt="${artist.name}" onerror="this.src='./picture/default.png'">
        </a>
      </div>
      <h3 class="product-title">
        <a href="Sanalhuselt.html?id=${artist.id}">${artist.name}</a>
      </h3>
      <section class="product-info">
        <p class="rating">💖${artist.likes}</p>
        <p class="product-location">${artist.location}</p>
        <p class="product-category">${this.formatCategory(artist.category)}</p>
        <p class="price">${this.formatPrice(artist.price)}₮</p>
      </section>
      <button class="order-button"">Захиалга өгөх</button>
    </article>
  `
  )
  .join('');
  }

  formatPrice(price) {
    return new Intl.NumberFormat('mn-MN').format(Math.floor(price));
  }

  formatCategory(category) {
    const categories = { singer: 'Дуучин', band: 'Хамтлаг', musician: 'Хөгжимчин', host: 'Хөтлөгч', comedian: 'Комедиан', dancer: 'Бүжигчин' };
    return categories[category] || category;
  }

}

document.addEventListener('DOMContentLoaded', () => {
  new ArtistManager();
});

export default ArtistManager;