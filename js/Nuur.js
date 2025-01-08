import ApiService from './Apiartist.js';


// Deer import hiij avchirsan artistiin datag fetch hiij avdag function 
async function Artists_avah() {
  try { 
    const AData = await ApiService.fetchArtists();
    const processedArtists = processArtists(AData);

    // Ontsloh artist haruulah function
    const specialArtists = getSpecialArtists(processedArtists);
    renderArtistCards(specialArtists, 'special-artists-container');

    // Shine suuld  nemsen artist - iig shine artist gej avna
    const newArtists = getNewArtists(processedArtists);
    renderArtistCards(newArtists, 'new-artists-container');
  } catch (error) {
    console.error('Artistaa avsanguee :', error);
  }
}

function processArtists(artists) {
  const sortedByComment = [...artists].sort((a, b) => b.comment - a.comment);
  const topComment = sortedByComment[3]?.comment || 0;
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
function getSpecialArtists(processedArtists) {
  return processedArtists.filter(artist => artist.isSpecial);
}

function getNewArtists(processedArtists) {
  return processedArtists.filter(artist => artist.isNew);
}

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

function renderArtistCards(artists, containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = artists.map(createArtistCard).join('');
  }
}
// animation nii kod door gurvan turulliii
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      entry.target.classList.remove('show');
    } else {
      entry.target.classList.add('show');
    }
  });
}, {
  rootMargin: '-50px',
  threshold: 0.15
});

['hamtlag', 'hugjim', 'duuchin'].forEach(id => {
  const element = document.getElementById(id);
  if (element) {
    observer.observe(element);
  }
});

document.addEventListener('DOMContentLoaded', Artists_avah);
