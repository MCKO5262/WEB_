import './order-card.js';
export class OrderList extends HTMLElement {
  static get observedAttributes() {
    return ['dark-mode'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._orders = [];
  }

  set orders(value) {
    this._orders = value;
    this.render();
  }

  get orders() {
    return this._orders || [];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'dark-mode') {
      this.updateTheme(newValue !== null);
    }
  }

  updateTheme(isDark) {
    const cards = this.shadowRoot.querySelectorAll('order-card');
    cards.forEach(card => {
      if (isDark) {
        card.setAttribute('dark-mode', '');
      } else {
        card.removeAttribute('dark-mode');
      }
    });
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        :host {
          display: block;
        }
        #mainContent {
          padding: 0;
          min-height: calc(100vh - 2rem);
        }

        #orderContainer {
          background: var(--bc2);
          border-radius: 1rem;
          padding: 1.5rem;
        }

        .orders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
          padding: 1rem;
        }

        @media (max-width: 768px) {
          .orders-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      </style>
      <div id="mainContent">
        <div id="orderContainer">
          <div class="orders-grid"></div>
        </div>
      </div>
    `;

    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const ordersGrid = this.shadowRoot.querySelector('.orders-grid');
    this.orders.forEach(order => {
      const orderCard = document.createElement('order-card');
      orderCard.setAttribute('order-id', order.id);
      orderCard.setAttribute('artist-name', order.artistName);
      orderCard.setAttribute('event-time', order.eventTime);
      orderCard.setAttribute('image-url', order.image);
      orderCard.setAttribute('description', JSON.stringify(order.description));
      if (this.hasAttribute('dark-mode')) {
        orderCard.setAttribute('dark-mode', '');
      }
      ordersGrid.appendChild(orderCard);
    });
  }
}

customElements.define('order-list', OrderList);