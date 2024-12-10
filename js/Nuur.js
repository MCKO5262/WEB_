// API endpoint for fetching artists
const API_URL = 'https://api.jsonbin.io/v3/qs/6757a43facd3cb34a8b6f236';

// Fetch artists from API
async function fetchArtists() {
  try {
    console.log('Өгөгдөл татах хүсэлт эхэллээ...');
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      // Timeout тохируулах
      signal: AbortSignal.timeout(10000) // 10 секунд хүлээнэ
    });
    
    console.log('Хүсэлтийн статус:', response.status);
    console.log('Хүсэлтийн headers:', response.headers);
    
    if (!response.ok) {
      throw new Error(`HTTP алдаа! статус: ${response.status}`);
    }
    
    const responseData = await response.json();
    
    // Extract the actual artists array from JSONBin.io v3 response
    const artistData = responseData.record || responseData;
    
    console.log('Амжилттай өгөгдөл татаж авлаа');
    return artistData;
  } catch (error) {
    console.error('Өгөгдөл татахад гарсан алдаа:', error);
    throw error; // Дээд түвшний функц руу алдааг дамжуулна
  }
}

// Process artists data
function processArtists(artists) {
  // Ensure artists is an array
  if (!Array.isArray(artists)) {
    console.error('Өгөгдөл массив биш байна:', artists);
    return [];
  }

  // Sort by bookings to find top performers (special)
  const sortedByBookings = [...artists].sort((a, b) => b.bookings - a.bookings);
  const topBookings = sortedByBookings[3]?.bookings || 0;

  // Sort by ID to find newest
  const sortedById = [...artists].sort((a, b) => b.id - a.id);
  const newestIdThreshold = sortedById[3]?.id || 0;

  // Process each artist
  return artists.map(artist => ({
    id: artist.id,
    name: artist.name,
    likes: artist.likes,
    bookings: artist.bookings,
    image: artist.image,
    isSpecial: artist.bookings >= topBookings,
    isNew: artist.id >= newestIdThreshold
  }));
}

// Get special artists
function getSpecialArtists(processedArtists) {
  return processedArtists.filter(artist => artist.isSpecial);
}

// Get new artists
function getNewArtists(processedArtists) {
  return processedArtists.filter(artist => artist.isNew);
}

// Create artist card HTML
function createArtistCard(artist) {
  return `
    <article class="artist-card">
      <img src="${artist.image}" alt="${artist.name}" loading="lazy" />
      <div class="artist-card-info">
        <p class="comment">Cэтгэгдэл: ${artist.bookings}</p>
        <p class="likes">Таалагдсан: ${artist.likes}</p>
        <h3>${artist.name}</h3>
      </div>
    </article>
  `;
}

// Render artist cards to container
function renderArtistCards(artists, containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = artists.map(createArtistCard).join('');
  }
}

async function initializeArtists() {
  try {
    // Fetch artists from API
    const rawArtistData = await fetchArtists();
    
    console.log('Raw artist data:', rawArtistData); // Өгөгдлийг бүрэн харах
    
    // Process artists data
    const processedArtists = processArtists(rawArtistData);
    
    console.log('Processed artists:', processedArtists); // Боловсруулсан өгөгдөл
    
    // Render special artists
    const specialArtists = getSpecialArtists(processedArtists);
    renderArtistCards(specialArtists, 'special-artists-container');
    
    // Render new artists
    const newArtists = getNewArtists(processedArtists);
    renderArtistCards(newArtists, 'new-artists-container');
  } catch (error) {
    console.error('Алдааны бүрэн мэдээлэл:', error);
    
    // Дэлгэрэнгүй алдааны мэдээлэл харуулах
    console.error('Алдааны нэр:', error.name);
    console.error('Алдааны мессеж:', error.message);
    console.error('Алдааны stack:', error.stack);
    
    // Сервер буюу сүлжээний алдаа бол нэмэлт мэдээлэл харуулах
    if (error instanceof TypeError) {
      console.error('Сүлжээний холболтын алдаа байж магадгүй');
    }
    
    const specialContainer = document.getElementById('special-artists-container');
    const newContainer = document.getElementById('new-artists-container');
    
    if (specialContainer) {
      specialContainer.innerHTML = `
        <p>Өгөгдөл татахад алдаа гарлаа:</p>
        <p>Алдааны мессеж: ${error.message}</p>
      `;
    }
    
    if (newContainer) {
      newContainer.innerHTML = `
        <p>Өгөгдөл татахад алдаа гарлаа:</п>
        <p>Алдааны мессеж: ${error.message}</p>
      `;
    }
  }
}

document.addEventListener('DOMContentLoaded', initializeArtists);