// ArtistManager класс үүсгэж байна
class ArtistManager {
  // Классын constructor - анхны утгуудыг зарлаж өгч байна
  constructor() {
    // Тестийн өгөгдөл - дуучид, хамтлагуудын мэдээллийг агуулсан массив
    this.mockData = [ /* дуучид, хамтлагуудын дата */ ];
    
    // Уран бүтээлчдийн массив
    this.artists = [];
    
    // Идэвхтэй шүүлтүүрүүдийг хадгалах Map
    this.activeFilters = new Map();
    
    // Классыг эхлүүлэх
    this.init();
  }

  // Класс эхлүүлэх функц
  async init() {
    // mockData-г artists массив руу хуулах
    this.artists = this.mockData;
    
    // Шүүлтүүрийн tag-уудын контейнер үүсгэх
    this.setupFilterTagsContainer();
    
    // Уран бүтээлчдийг дэлгэцэнд харуулах
    this.renderArtists(this.artists);
    
    // Шүүлтүүрүүдийг тохируулах
    this.setupFilters();
    
    // URL дээрх шүүлтүүрүүдийг хэрэгжүүлэх
    this.applyURLFilters();
  }

  // Шүүлтүүрийн tag-уудын контейнер үүсгэх
  setupFilterTagsContainer() {
    // Хэрэв active-filters класстай элемент байхгүй бол шинээр үүсгэх
    if (!document.querySelector('.active-filters')) {
      const navbar = document.querySelector('.navbar');
      const container = document.createElement('div');
      container.className = 'active-filters';
      navbar.insertAdjacentElement('afterend', container);
    }
  }

  // Шүүлтүүрүүдийг тохируулах
  setupFilters() {
    // Dropdown цэсний элементүүд дээр дарах үед
    document.querySelectorAll('.dropdown-content a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const filterType = e.target.closest('.dropdown').querySelector('.dropbtn').textContent;
        const value = e.target.textContent;
        
        // Шүүлтүүрийг шинэчлэх
        this.updateFilters(filterType, value);
      });
    });

    // Хайлтын input-д өөрчлөлт орох үед
    const searchInput = document.getElementById('search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filterArtists({ search: e.target.value });
      });
    }
  }

  // Шүүлтүүрүүдийг шинэчлэх
  updateFilters(filterType, value) {
    // URL параметрүүдийг авах
    const params = new URLSearchParams(window.location.search);
    let paramKey = '';
    
    // Шүүлтүүрийн төрлөөс хамааран URL параметр тохируулах
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

    // Идэвхтэй шүүлтүүрт нэмэх
    this.activeFilters.set(filterType, value);
    
    // Шүүлтүүрийн tag-уудыг шинэчлэх
    this.updateFilterTags();

    // URL-г шинэчлэх
    window.history.pushState({}, '', `${window.location.pathname}?${params}`);
    
    // URL дээрх шүүлтүүрүүдийг хэрэгжүүлэх
    this.applyURLFilters();
  }

  // Шүүлтүүрийн tag-уудыг шинэчлэх
  updateFilterTags() {
    const container = document.querySelector('.active-filters');
    if (!container) return;

    // Одоо байгаа tag-уудыг цэвэрлэх
    container.innerHTML = '';

    // Идэвхтэй шүүлтүүр бүрт tag үүсгэх
    this.activeFilters.forEach((value, type) => {
      const tag = document.createElement('span');
      tag.className = 'filter-tag';
      tag.innerHTML = `
        ${value}
        <button class="remove-filter" data-type="${type}">×</button>
      `;
      container.appendChild(tag);

      // Tag устгах товчлуур дээр дарах үед
      tag.querySelector('.remove-filter').addEventListener('click', () => {
        this.removeFilter(type);
      });
    });
  }

  // Шүүлтүүр устгах
  removeFilter(filterType) {
    // URL параметрүүдийг авах
    const params = new URLSearchParams(window.location.search);
    
    // Идэвхтэй шүүлтүүрээс устгах
    this.activeFilters.delete(filterType);
    
    // URL параметрээс устгах
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

    // URL болон tag-уудыг шинэчлэх
    window.history.pushState({}, '', `${window.location.pathname}?${params}`);
    this.updateFilterTags();
    this.applyURLFilters();
  }

  // URL дээрх шүүлтүүрүүдийг хэрэгжүүлэх
  applyURLFilters() {
    // URL параметрүүдийг унших
    const params = new URLSearchParams(window.location.search);
    const filters = {
      category: params.get('category'),
      price: params.get('price'),
      location: params.get('location'),
      search: params.get('search')
    };

    // Шүүлтүүрүүдийг хэрэгжүүлэх
    this.filterArtists(filters);
  }

  // Уран бүтээлчдийг шүүх
  filterArtists(filters = {}) {
    let filtered = [...this.artists];

    // Ангилалаар шүүх
    if (filters.category) {
      filtered = filtered.filter(artist => artist.category === filters.category);
    }

    // Үнээр шүүх
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

    // Байршлаар шүүх
    if (filters.location) {
      filtered = filtered.filter(artist => 
        artist.location === filters.location
      );
    }

    // Хайлтаар шүүх
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm) ||
        artist.category.toLowerCase().includes(searchTerm) ||
        artist.location.toLowerCase().includes(searchTerm)
      );
    }

    // Шүүсэн үр дүнг харуулах
    this.renderArtists(filtered);
  }

  // Уран бүтээлчдийг дэлгэцэнд харуулах
  renderArtists(artists) {
    const container = document.querySelector('.marketplace-container');
    if (!container) {
      console.error('Container element not found!');
      return;
    }
    
    // HTML үүсгэх
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

    // HTML-г контейнерт оруулах
    container.innerHTML = artistsHTML;

    // Захиалгын товчлуурууд дээр click event listener нэмэх
    document.querySelectorAll('.order-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const artistId = e.target.dataset.artistId;
        this.handleBooking(artistId);
      });
    });
  }

  // Ангилалын нэрийг форматлах
  formatCategory(category) {
    const categories = {
      'singer': 'Дуучин',
      'band': 'Хамтлаг'
    };
    return categories[category] || category;
  }

  // Үнийг форматлах
  formatPrice(price) {
    return new Intl.NumberFormat('mn-MN').format(price);
  }

  // Захиалга хийх
  handleBooking(artistId) {
    window.location.href = `ordercheck.html?artist=${artistId}`;
  }
}

// HTML ачаалагдсаны дараа ArtistManager классыг эхлүүлэх
document.addEventListener('DOMContentLoaded', () => {
  new ArtistManager();
});

// Классыг export хийх
export default ArtistManager;