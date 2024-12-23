export class OrderConfirmation extends HTMLElement {
  static get properties() {
      return {
          status: { type: String, reflect: true }, // Захиалгын статус (confirmed/rejected/pending)
          message: { type: String }, // Харуулах мессеж
          orderNumber: { type: String } // Захиалгын дугаар
      };
  }

  constructor() {
      super();
      this.attachShadow({ mode: 'open' }); // Shadow DOM үүсгэх
      this._state = {
          status: 'pending',
          message: '',
          orderNumber: '',
          isVisible: false // Мод харагдах төлөв
      };
  }

  get state() {
      return this._state; // Тухайн үеийн төлөвийг авах
  }

  set state(newState) {
      this._state = { ...this._state, ...newState }; // Төлөвийг шинэчлэх
      this.updateUI(); // UI-г шинэчлэх
  }

  connectedCallback() {
      this.render(); // Элемент холбогдоход DOM-д дүрслэх
      this.setupEventListeners(); 
  }

  render() {
      const template = document.createElement('template');
      template.innerHTML = `
      <style>
        :host {
          display: none; // Эхэндээ харагдахгүй
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1000; // Бусад элементүүдийн дээр гаргах
        }

        :host([status="showing"]) {
          display: flex; // Модал харагдах үед
          align-items: center;
          justify-content: center;
        }

        .overlay {
          background: rgba(0, 0, 0, 0.5); // Арын бүдэг хэсэг
        }

        .popup {
          background: var(--background-color, #ffffff); // Модалын дотоод өнгө
          color: var(--text-color, #000000); // Текстийн өнгө
          padding: 2rem;
        }

        .status-icon {
          font-size: 48px; // Статусын дүрсний хэмжээ
        }
      </style>

      <div class="overlay"></div>
      <div class="popup">
        <div class="status-icon"></div>
        <slot name="title"><h3>Захиалгын статус</h3></slot>
        <slot name="message"><p id="statusMessage"></p></slot>
        <div class="order-number">
          <p>Таны захиалгын дугаар: <span id="orderNumberDisplay"></span></p>
        </div>
        <slot name="actions"><button id="closeBtn">Хаах</button></slot>
      </div>
    `;

      this.shadowRoot.appendChild(template.content.cloneNode(true)); // DOM-д нэмэх
  }

  setupEventListeners() {
      this.shadowRoot.getElementById('closeBtn').addEventListener('click', () => {
          this.hide(); // Хаах товч дарсан үед модалыг нуух
          this.dispatchEvent(new CustomEvent('confirmation-closed', { bubbles: true, composed: true })); // Үйл явдал тараах
      });
  }

  show(status, message, orderNumber = '123456') {
      this.state = {
          status,
          message,
          orderNumber,
          isVisible: true // Модал харагдах төлөвийг шинэчлэх
      };
      this.setAttribute('status', 'showing'); // Статус харуулах
  }

  hide() {
      this.state = { isVisible: false }; // Модалыг нуух
      this.setAttribute('status', 'pending'); // Статусыг анхдагч болгож тохируулах
  }

  updateUI() {
      const messageEl = this.shadowRoot.getElementById('statusMessage');
      const orderNumberEl = this.shadowRoot.getElementById('orderNumberDisplay');

      if (this.state.isVisible) {
          messageEl.textContent = this.state.message; // Мессеж шинэчлэх
          orderNumberEl.textContent = this.state.status === 'confirmed' ? this.state.orderNumber : ''; // Захиалгын дугаар шинэчлэх
      }
  }
}

customElements.define('order-confirmation', OrderConfirmation);