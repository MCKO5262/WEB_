import ApiService from './Apiartist.js'; // Уран бүтээлчдийн API үйлчилгээг импортлох.

class ArtistDetailManager { // Уран бүтээлчдийн дэлгэрэнгүйг удирдах класс.
  constructor() { // Классийн конструктор функц.
    this.artist = null; // Уран бүтээлчийн анхны утга.
    this.init(); // Инициализаци хийх.
  }

  async init() { // Инициализаци хийх функц.
    try {
      const artistId = this.getArtistIdFromUrl(); // URL-ээс уран бүтээлчийн ID-г авах.
      if (!artistId) throw new Error('No artist ID found in URL'); // ID байхгүй тохиолдолд алдаа үүсгэх.

      await this.fetchAndDisplayArtist(artistId); // Уран бүтээлчийн мэдээллийг татаж, дэлгэц дээр харуулах.
      this.setupEventListeners(); // Товчлууруудын үйлдлийг тохируулах.
    } catch (error) {
      console.error('Initialization error:', error); // Инициализацийн алдааг бүртгэх.
    }
  }

  getArtistIdFromUrl() { // URL-ээс уран бүтээлчийн ID-г авах функц.
    return new URLSearchParams(window.location.search).get('id'); // URL-ийн параметрээс ID-г авах.
  }

  async fetchAndDisplayArtist(artistId) { // Уран бүтээлчийн мэдээллийг татах функц.
    try {
      const artists = await ApiService.fetchArtists(); // Уран бүтээлчдийн жагсаалтыг API-аас татах.
      this.artist = artists.find(artist => artist.id === +artistId); // Тухайн ID-д тохирох уран бүтээлчийг олох.
      if (!this.artist) throw new Error('Artist not found'); // Уран бүтээлч олдохгүй бол алдаа үүсгэх.

      this.updatePageContent(); // Дэлгэцийн контентыг шинэчлэх.
    } catch (error) {
      console.error('Error fetching artist:', error); // Мэдээлэл татах алдааг бүртгэх.
    }
  }

  updatePageContent() { // Дэлгэцийн контентыг шинэчлэх функц.
    if (!this.artist) return; // Хэрэв уран бүтээлчийн мэдээлэл байхгүй бол буцах.

    this.setElementContent('profile-image', 'src', this.artist.image, './picture/default.png'); // Зураг тохируулах.
    this.setElementContent('profile-name', 'textContent', this.artist.name); // Нэр тохируулах.
    this.setElementContent('star-rating', 'textContent', '★'.repeat(Math.min(this.artist.rating || 3, 5))); // Үнэлгээ тохируулах.
    this.setElementContent('location', 'textContent', this.artist.location); // Байршил тохируулах.
    this.setElementContent('price', 'textContent', `${this.formatPrice(this.artist.price)} ₮`); // Үнэ тохируулах.
    this.setElementContent('description p', 'textContent', this.artist.description); // Тайлбар тохируулах.
    this.setElementContent('like-button', 'textContent', `Талагдсан (${this.artist.likes || 0})`); // Like товчны агуулгыг тохируулах.

    if (this.artist.video) this.setMedia('video', this.artist.video); // Видео тохируулах.
    document.title = `${this.artist.name} - Solned`; // Хуудасны гарчиг тохируулах.
  }

  setElementContent(selector, property, value, fallback = '') { // HTML элементийн контентыг тохируулах функц.
    const element = document.querySelector(`#${selector}`); // Элементийг сонгох.
    if (element) { // Хэрэв элемент байвал:
      element[property] = value || fallback; // Шинж чанарыг тохируулах.
      if (property === 'src' && element.onerror) { // Хэрэв зураг байвал:
        element.onerror = () => element.src = fallback; // Зураг алдаатай бол fallback зураг харуулах.
      }
    }
  }

  setMedia(type, src) { // Видео эсвэл медиа тохируулах функц.
    const videoContainer = document.querySelector('#video-container'); // Видео хэсгийг сонгох.
    if (!videoContainer) return; // Хэрэв байхгүй бол буцах.

    const media = type === 'video' ? `<video controls><source src="${src}" type="video/mp4"></video>` : // Видео тохируулах.
                  type === 'audio' ? `<audio controls><source src="${src}" type="audio/mpeg"></audio>` : // Аудио тохируулах.
                  `<img src="${src}" alt="${this.artist.name || 'Artist'}"/>`; // Зураг тохируулах.
    videoContainer.innerHTML = media; // Контейнерт медиа нэмэх.
  }

  setupEventListeners() { // Үйлдлүүдийн сонсогч тохируулах функц.
    const likeButton = document.getElementById('like-button'); // Like товчийг сонгох.
    if (likeButton) { // Хэрэв байвал:
      likeButton.addEventListener('click', e => { // Дарсан үйлдлийг сонсох.
        e.preventDefault(); // Default үйлдлийг зогсоох.
        if (this.artist && !likeButton.disabled) { // Уран бүтээлчийн мэдээлэл байгаа бол:
          this.artist.likes = (this.artist.likes || 0) + 1; // Like нэмэгдүүлэх.
          console.log('Like clicked for artist:', this.artist.id); // Like дарсан тухай бүртгэх.
          likeButton.textContent = `Талагдсан (${this.artist.likes})`; // Like-ийн тоог шинэчлэх.

          likeButton.disabled = true; // Товчийг идэвхгүй болгох.
        }
      });
    }

    this.setupButton('order-button', id => `get-order.html?id=${id}`); // Захиалга товч тохируулах.
    this.setupButton('schedule-button', () => { // Хуваарь товч тохируулах.
      console.log('Schedule clicked for artist:', this.artist?.id); // Хуваарь товч дарсан тухай бүртгэх.
    });
  }

  setupButton(buttonId, callback) { // Товчлуур тохируулах функц.
    document.getElementById(buttonId)?.addEventListener('click', e => { // Товч дарсан үйлдлийг сонсох.
      if (this.artist) window.location.href = callback(this.artist.id); // Callback функц дуудаж, URL-руу шилжих.
    });
  }

  formatPrice(price) { // Үнэ форматлах функц.
    return new Intl.NumberFormat('mn-MN').format(Math.floor(price)); // Үнэ Монгол хэлбэрээр форматлах.
  }
}

document.addEventListener('DOMContentLoaded', () => new ArtistDetailManager()); // Хуудас ачаалсаны дараа `ArtistDetailManager` үүсгэх.

export default ArtistDetailManager; // Классыг экспортлох.
