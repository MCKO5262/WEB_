export class OrderForm extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' }); // Shadow DOM үүсгэх
      this._state = {
          isSubmitting: false, // Илгээж байгаа эсэх төлөв
          validation: {}, // Баталгаажуулалтын өгөгдөл
          formData: {} // Формын өгөгдөл
      };
  }

  
    get state() {
      return this._state;
    }
  
    set state(newState) {
      this._state = { ...this._state, ...newState };
      this.updateUI();
    }
  
    connectedCallback() {
      this.render(); // Элемент холбогдоход DOM-д дүрслэх
      this.setupEventListeners(); // Үйл явдлын сонсогчдыг тохируулах
  }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'theme') {
        this.updateTheme(newValue);
      } else if (name === 'state') {
        this.updateState(newValue);
      }
    }
  
    render() {
      const template = document.createElement('template');
      template.innerHTML = `
        <style>
          :host {
            display: block;
            --form-bg: var(--background-color, #ffffff);
            --form-text: var(--text-color, #000000);
            --input-bg: rgba(75, 0, 130, 0.5);
            --input-text: var(--txtc, #ffffff);
            --error-color: #f44336;
            --success-color: #4CAF50;
          }
          
          :host([theme="dark"]) {
            --form-bg: var(--dark-background, #333333);
            --form-text: var(--dark-text, #ffffff);
          }
  
          :host([state="submitting"]) .form-container {
            opacity: 0.7;
            pointer-events: none;
          }
  
          .form-container {
            background-color: var(--form-bg);
            color: var(--form-text);
            padding: 2rem;
            border-radius: 16px;
            transition: all 0.3s ease;
            max-width: 800px;
            margin: 0 auto;
          }
  
          .validation-error {
            color: var(--error-color);
            font-size: 0.875rem;
            margin-top: 4px;
            display: none;
          }
  
          .validation-error.show {
            display: block;
          }
  
          .form-section {
            margin-bottom: 2rem;
          }
  
          .form-section h3 {
            color: var(--form-text);
            margin-bottom: 1.5rem;
            font-size: 1.25rem;
            border-bottom: 1px solid var(--form-text);
            padding-bottom: 0.5rem;
          }
  
          .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
          }
  
          label {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            color: var(--form-text);
            font-size: 1rem;
          }
  
          input,
          select,
          textarea {
            background-color: var(--input-bg);
            color: var(--input-text);
            border: 1px solid transparent;
            padding: 0.75rem;
            border-radius: 8px;
            font-size: 1rem;
            transition: all 0.3s ease;
          }
  
          input:focus,
          select:focus,
          textarea:focus {
            outline: none;
            border-color: var(--form-text);
          }
  
          input::placeholder,
          select::placeholder,
          textarea::placeholder {
            color: rgba(255, 255, 255, 0.7);
          }
  
          textarea {
            resize: vertical;
            min-height: 100px;
          }
  
          .submit-button {
            grid-column: 1 / -1;
            background-color: var(--success-color);
            color: white;
            padding: 1rem 2rem;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 2rem;
          }
  
          .submit-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          }
  
          .submit-button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
            transform: none;
          }

          @media (max-width: 768px) {
            .form-container {
              padding: 1rem;
            }
  
            .form-grid {
              grid-template-columns: 1fr;
            }
  
            .submit-button {
              width: 100%;
            }
          }
        </style>
  
        <div class="form-container">
          <slot name="header"></slot>
          <form id="orderForm" novalidate>
            <div class="form-section">
              <h3>1. Хэрэглэгчийн мэдээлэл</h3>
              <div class="form-grid">
                <label>
                  Овог, нэр: *
                  <input type="text" name="fullName" required placeholder="Хариулт оруулах">
                  <span class="validation-error" data-for="fullName">Овог нэрээ оруулна уу</span>
                </label>
                <label>
                  Холбогдох утасны дугаар: *
                  <input type="tel" name="phone" required placeholder="Хариулт оруулах"
                         pattern="[0-9]{8}">
                  <span class="validation-error" data-for="phone">Зөв утасны дугаар оруулна уу</span>
                </label>
                <label>
                  И-мэйл хаяг: *
                  <input type="email" name="email" required placeholder="Хариулт оруулах">
                  <span class="validation-error" data-for="email">Зөв и-мэйл хаяг оруулна уу</span>
                </label>
              </div>
            </div>

            <div class="form-section">
              <h3>2. Үйл ажиллагааны мэдээлэл</h3>
              <div class="form-grid">
                <label>
                  Үйл ажиллагааны төрөл: *
                  <select name="eventType" required>
                    <option value="">Сонгох</option>
                    <option value="concert">Тоглолт</option>
                    <option value="private">Хувийн арга хэмжээ</option>
                    <option value="corporate">Байгууллагын өдөрлөг</option>
                    <option value="festival">Баяр наадам</option>
                    <option value="other">Бусад</option>
                  </select>
                  <span class="validation-error" data-for="eventType">Үйл ажиллагааны төрлөө сонгоно уу</span>
                </label>
                <label>
                  Үйл ажиллагааны огноо: *
                  <input type="datetime-local" name="eventDate" required>
                  <span class="validation-error" data-for="eventDate">Огноо сонгоно уу</span>
                </label>
                <label>
                  Үйл ажиллагааны байршил: *
                  <input type="text" name="location" required placeholder="Хот, дүүрэг, тодорхой хаяг">
                  <span class="validation-error" data-for="location">Байршлаа оруулна уу</span>
                </label>
              </div>
            </div>

            <div class="form-section">
              <h3>3. Тусгай хүсэлт</h3>
              <div class="form-grid">
                <label>
                  Тусгай хүсэлт:
                  <textarea name="specialRequests" placeholder="Жишээ: тайз, гэрэлтүүлэг"></textarea>
                </label>
              </div>
            </div>

            <button type="submit" class="submit-button" ${this.state.isSubmitting ? 'disabled' : ''}>
              ${this.state.isSubmitting ? 'Илгээж байна...' : 'Захиалга илгээх'}
            </button>
          </form>
        </div>
      `;
  
      this.shadowRoot.appendChild(template.content.cloneNode(true)); // DOM-д нэмэх
    }
  
    setupEventListeners() {
      const form = this.shadowRoot.querySelector('#orderForm');
      if (form) {
        form.addEventListener('submit', this.handleSubmit.bind(this));
        form.addEventListener('input', this.handleInput.bind(this));
      }
    }
  
    handleInput(event) {
      const { name, value } = event.target;
      this.state = {
        formData: {
          ...this.state.formData,
          [name]: value
        }
      };
  
      this.validateField(event.target);
  
      this.dispatchEvent(new CustomEvent('form-input', {
        detail: { name, value },
        bubbles: true,
        composed: true
      }));
    }
  
    validateField(field) {
      const errorElement = this.shadowRoot.querySelector(`.validation-error[data-for="${field.name}"]`);
      if (!errorElement) return;
  
      if (field.required && !field.value) {
        errorElement.textContent = 'Энэ талбарыг бөглөх шаардлагатай';
        errorElement.classList.add('show');
        return false;
      }
  
      if (field.type === 'email' && field.value && !this.validateEmail(field.value)) {
        errorElement.textContent = 'Зөв и-мэйл хаяг оруулна уу';
        errorElement.classList.add('show');
        return false;
      }
  
      if (field.type === 'tel' && field.value && !this.validatePhone(field.value)) {
        errorElement.textContent = 'Зөв утасны дугаар оруулна уу';
        errorElement.classList.add('show');
        return false;
      }
  
      errorElement.classList.remove('show');
      return true;
    }
  
    validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  
    validatePhone(phone) {
      return /^[0-9]{8}$/.test(phone);
    }
  
    validateForm() {
      const form = this.shadowRoot.querySelector('#orderForm');
      let isValid = true;
      
      const requiredFields = form.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        if (!this.validateField(field)) {
          isValid = false;
        }
      });
  
      return isValid;
    }
  
    async handleSubmit(event) {
      event.preventDefault();
      
      if (this.state.isSubmitting) return;
      
      if (!this.validateForm()) {
        return;
      }
  
      this.state = { isSubmitting: true };
      this.setAttribute('state', 'submitting');
  
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
  
      try {
        this.dispatchEvent(new CustomEvent('order-submit', {
          detail: data,
          bubbles: true,
          composed: true
        }));
      } catch (error) {
        this.state = { 
          isSubmitting: false,
          validation: { general: 'Захиалга илгээх үед алдаа гарлаа' }
        };
      }
    }
  
    updateTheme(theme) {
      if (theme === 'dark') {
        this.shadowRoot.host.setAttribute('theme', 'dark');
      } else {
        this.shadowRoot.host.removeAttribute('theme');
      }
    }
  
    updateUI() {
      const submitButton = this.shadowRoot.querySelector('.submit-button');
      if (submitButton) {
        submitButton.disabled = this.state.isSubmitting;
        submitButton.textContent = this.state.isSubmitting ? 'Илгээж байна...' : 'Захиалга илгээх';
      }
  
      const container = this.shadowRoot.querySelector('.form-container');
      if (container) {
        container.classList.toggle('submitting', this.state.isSubmitting);
      }
    }
}
  
customElements.define('order-form', OrderForm);