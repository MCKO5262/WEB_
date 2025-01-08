import ApiService from './Apiartist.js';

// Artists-ийг эхлүүлэх функц
async function initializeArtists() {
  try {
    // API-ээс өгөгдөл авах
    const rawArtistData = await ApiService.fetchArtists();
    console.log('Raw artist data:', rawArtistData);

    // Artists өгөгдлийг боловсруулах
    const processedArtists = processArtists(rawArtistData);
    console.log('Processed artists:', processedArtists);

    // Онцлох artists-ийг харуулах
    const specialArtists = getSpecialArtists(processedArtists);
    renderArtistCards(specialArtists, 'special-artists-container');

    // Шинэ artists-ийг харуулах
    const newArtists = getNewArtists(processedArtists);
    renderArtistCards(newArtists, 'new-artists-container');
  } catch (error) {
    console.error('Error initializing artists:', error);
    showError('special-artists-container', error.message);
    showError('new-artists-container', error.message);
  }
}

// Artists өгөгдлийг боловсруулах функц
function processArtists(artists) {
  if (!Array.isArray(artists)) {
    console.error('Өгөгдөл массив биш байна:', artists);
    return [];
  }

  // Comment-д тулгуурлан ангилах
  const sortedByComment = [...artists].sort((a, b) => b.comment - a.comment);
  const topComment = sortedByComment[3]?.comment || 0;

  // ID-д тулгуурлан ангилах
  const sortedById = [...artists].sort((a, b) => b.id - a.id);
  const newestIdThreshold = sortedById[3]?.id || 0;

  return artists.map(artist => ({
    id: artist.id,
    name: artist.name,
    likes: artist.likes,
    comment: artist.comment,
    image: artist.image,
    isSpecial: artist.comment >= topComment,
    isNew: artist.id >= newestIdThreshold,
  }));
}

// Онцлох artists авах
function getSpecialArtists(processedArtists) {
  return processedArtists.filter(artist => artist.isSpecial);
}

// Шинэ artists авах
function getNewArtists(processedArtists) {
  return processedArtists.filter(artist => artist.isNew);
}

// Artists карт үүсгэх функц
function createArtistCard(artist) {
  return `
    <article class="artist-card">
    <a href="Sanalhuselt.html?id=${artist.id}">
      <img src="${artist.image}" alt="${artist.name}" loading="lazy" />
      <article class="artist-card-info">
        <p class="comment">Cэтгэгдэл: ${artist.comment}</p>
        <p class="likes">Таалагдсан: ${artist.likes}</p>
        <h3>${artist.name}</h3>
      </article>
      </a>
    </article>
  `;
}

// Artists карт харуулах
function renderArtistCards(artists, containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = artists.map(createArtistCard).join('');
  }
}

// Алдааны мэдээлэл харуулах
function showError(containerId, message) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = `
      <p>Өгөгдөл татахад алдаа гарлаа:</p>
      <p>${message}</p>
    `;
  }
}
// Scroll animation хийх JavaScript код
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // Элемент харагдахгүй болох үед show классыг хасна
    if (!entry.isIntersecting) {
      entry.target.classList.remove('show');
    } else {
      // Элемент харагдах үед show классыг нэмнэ
      entry.target.classList.add('show');
    }
  });
}, {
  // Root margin нь element-ийг хэзээ ажиглаж эхлэхийг тохируулна
  rootMargin: '-50px',
  // Threshold нь element хэдэн хувь харагдах үед ажиллахыг заана
  threshold: 0.15
});

// ID-аар элемент бүрийг observe хийх
['hamtlag', 'hugjim', 'duuchin'].forEach(id => {
  const element = document.getElementById(id);
  if (element) {
    observer.observe(element);
  }
});

document.addEventListener('DOMContentLoaded', initializeArtists);
