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
  
    renderTabContent() {
      const tabContents = {
        basic: `
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
              <option>Байхгүй</option>
            </select>
          </div>
          <button class="save-button">Хадгалах</button>
        `,
        info: `
          <h2>Ерөнхий Мэдээлэл</h2>
          <p>Танилцуулга</p>
          <p>Дуучин хамтлаг болон наадамд дуулдаг алдартай уран бүтээлч.</p>
          <button class="save-button">Өөрчлөх</button>
        `,
        // Add similar content structure for other tabs: photos, video, audio.
      };
  
      return tabContents[this.activeTab] || '';
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          /* Add your updated CSS styles */
        </style>
        <aside class="sidebar">
          <div class="profile-image">
            <img src="/api/placeholder/400/400" alt="Profile Picture" />
          </div>
          <h1 class="profile-name">Thunder</h1>
          <nav class="tab-nav">
            <button class="tab-button ${this.activeTab === 'basic' ? 'active' : ''}" data-tab="basic">Үндсэн</button>
            <button class="tab-button ${this.activeTab === 'info' ? 'active' : ''}" data-tab="info">Ерөнхий</button>
            <!-- Add other tab buttons -->
          </nav>
        </aside>
        <main class="content">
          ${this.renderTabContent()}
        </main>
      `;
    }
  }
  
  customElements.define('profile-content', ProfileContent);
  