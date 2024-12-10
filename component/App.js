// ProfileContent.js - Main profile component using Web Components
class ProfileContent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.activeTab = localStorage.getItem('activeTab') || 'basic';
    }
  
    connectedCallback() {
      this.render();
      this.setupEventListeners();
    }
  
    setupEventListeners() {
      const tabButtons = this.shadowRoot.querySelectorAll('.tab-button');
      tabButtons.forEach(button => {
        button.addEventListener('click', () => {
          this.switchTab(button.dataset.tab);
        });
      });
  
      const saveButtons = this.shadowRoot.querySelectorAll('.save-button');
      saveButtons.forEach(button => {
        button.addEventListener('click', this.handleSave.bind(this));
      });
    }
  
    switchTab(tab) {
      this.activeTab = tab;
      localStorage.setItem('activeTab', tab);
      this.render();
    }
  
    handleSave(event) {
      const button = event.target;
      button.textContent = 'Хадгалагдлаа!';
      button.disabled = true;
  
      setTimeout(() => {
        button.textContent = 'Хадгалах';
        button.disabled = false;
      }, 2000);
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: flex;
            gap: 2rem;
            padding: 1rem;
            font-family: system-ui, sans-serif;
          }
            
          .sidebar {
            width: 20rem;
            flex-shrink: 0;
          }
  
          .profile-image {
            width: 100%;
            aspect-ratio: 1;
            background: #f3f4f6;
            border-radius: 0.5rem;
            overflow: hidden;
            margin-bottom: 1rem;
          }
  
          .profile-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
  
          .profile-name {
            font-size: 1.5rem;
            font-weight: bold;
            text-align: center;
            margin-bottom: 1.5rem;
          }
  
          .tab-nav {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            background: #f3f4f6;
            border-radius: 0.5rem;
            padding: 0.5rem;
          }
  
          .tab-button {
            padding: 0.75rem 1rem;
            border: none;
            background: none;
            border-radius: 0.375rem;
            cursor: pointer;
            text-align: left;
            transition: all 0.2s;
            color: #1f2937;
          }
  
          .tab-button:hover {
            background: #e5e7eb;
          }
  
          .tab-button.active {
            background: #9333ea;
            color: white;
          }
  
          .content {
            flex: 1;
            background: white;
            border-radius: 0.5rem;
            padding: 1.5rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
  
          .tab-content {
            display: none;
          }
  
          .tab-content.active {
            display: block;
          }
  
          h2 {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #1f2937;
          }
  
          .form-group {
            margin-bottom: 1rem;
          }
  
          label {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            margin-bottom: 0.5rem;
            color: #4b5563;
          }
  
          select {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #d1d5db;
            border-radius: 0.375rem;
            background: white;
            color: #1f2937;
          }
  
          .media-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 1rem;
          }
  
          .media-item {
            aspect-ratio: 1;
            background: #f3f4f6;
            border-radius: 0.5rem;
            overflow: hidden;
            position: relative;
          }
  
          .media-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
  
          .play-button {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.1);
          }
  
          .play-circle {
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
          }
  
          .audio-list {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }
  
          .audio-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.75rem;
            background: #f3f4f6;
            border-radius: 0.5rem;
          }
  
          .audio-control {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            border: none;
            background: #9333ea;
            color: white;
            cursor: pointer;
            flex-shrink: 0;
          }
  
          .save-button {
            margin-top: 1rem;
            padding: 0.75rem 2rem;
            background: linear-gradient(to right, #9333ea, #a855f7);
            color: white;
            border: none;
            border-radius: 9999px;
            cursor: pointer;
            transition: opacity 0.2s;
          }
  
          .save-button:hover {
            opacity: 0.9;
          }
  
          .save-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
  
          @media (max-width: 768px) {
            :host {
              flex-direction: column;
            }
  
            .sidebar {
              width: 100%;
            }
  
            .profile-image {
              max-width: 12rem;
              margin: 0 auto 1rem;
            }
  
            .media-grid {
              grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            }
          }
        </style>
  
        <aside class="sidebar">
          <div class="profile-image">
            <img src="/api/placeholder/400/400" alt="Thunder Profile" />
          </div>
          <h1 class="profile-name">Thunder</h1>
          <nav class="tab-nav">
            <button class="tab-button ${this.activeTab === 'basic' ? 'active' : ''}" data-tab="basic">Үндсэн</button>
            <button class="tab-button ${this.activeTab === 'info' ? 'active' : ''}" data-tab="info">Еренхий Мэдээлэл</button>
            <button class="tab-button ${this.activeTab === 'photos' ? 'active' : ''}" data-tab="photos">Зураг</button>
            <button class="tab-button ${this.activeTab === 'video' ? 'active' : ''}" data-tab="video">Видео</button>
            <button class="tab-button ${this.activeTab === 'audio' ? 'active' : ''}" data-tab="audio">Аудио</button>
          </nav>
        </aside>
  
        <main class="content">
          <div class="tab-content ${this.activeTab === 'basic' ? 'active' : ''}" id="basic">
            <h2>Үндсэн</h2>
            <div class="form-group">
              <label for="main-service">Үндсэн үйлчилгээ</label>
              <select id="main-service">
                <option>Дуучин</option>
              </select>
            </div>
            <div class="form-group">
              <label for="extra-service">Нэмэлт үйлчилгээ</label>
              <select id="extra-service">
                <option>Байгууй</option>
              </select>
            </div>
            <button class="save-button">Хадгалах</button>
          </div>
  
          <div class="tab-content ${this.activeTab === 'info' ? 'active' : ''}" id="info">
            <h2>Бренхий уран бүтээлчийн талаар</h2>
            <p>Танилцуулга</p>
            <p>Дуучин хамтлаг болон наадан дээр очиж дуулдаг нэхэмжлэх өрчин увийн залруул дугаар алдартай</p>
            <button class="save-button">өөрчлөх</button>
          </div>
  
          <div class="tab-content ${this.activeTab === 'photos' ? 'active' : ''}" id="photos">
            <h2>Таний зургууд</h2>
            <div class="media-grid">
              ${[1, 2, 3].map(() => `
                <div class="media-item">
                  <img src="/api/placeholder/400/400" alt="Profile photo" />
                </div>
              `).join('')}
            </div>
            <button class="save-button">Зураг нэмэх</button>
          </div>
  
          <div class="tab-content ${this.activeTab === 'video' ? 'active' : ''}" id="video">
            <h2>Видео</h2>
            <div class="media-grid">
              ${[1, 2].map(() => `
                <div class="media-item">
                  <div class="play-button">
                    <div class="play-circle">▶</div>
                  </div>
                </div>
              `).join('')}
            </div>
            <button class="save-button">Видео нэмэх</button>
          </div>
  
          <div class="tab-content ${this.activeTab === 'audio' ? 'active' : ''}" id="audio">
            <h2>Аудио</h2>
            <div class="audio-list">
              ${[1, 2].map(i => `
                <div class="audio-item">
                  <button class="audio-control">▶</button>
                  <span>Sample Audio Track ${i}</span>
                </div>
              `).join('')}
            </div>
            <button class="save-button">Аудио нэмэх</button>
          </div>
        </main>
      `;
    }
  }
  
  customElements.define('profile-content', ProfileContent);