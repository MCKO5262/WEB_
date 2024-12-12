import './order-card.js';
export class OrderCard extends HTMLElement {
  static get observedAttributes() {
    return ['likes', 'dark-mode', 'description'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._likes = 0;
  }

  get likes() {
    return this._likes;
  }

  set likes(value) {
    this._likes = value;
    this.updateLikes();
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'likes') {
      this._likes = parseInt(newValue) || 0;
      this.updateLikes();
    } else if (name === 'dark-mode') {
      this.render();
    }
  }

  setupEventListeners() {
    this.shadowRoot.querySelector('#cancelOrderBtn')?.addEventListener('click', () => {
      if (confirm('Захиалгыг цуцлахдаа итгэлтэй байна уу?')) {
        const orderId = this.getAttribute('order-id');
        const event = new CustomEvent('orderCancelled', {
          bubbles: true,
          composed: true,
          detail: { orderId }
        });
        this.dispatchEvent(event);
      }
    });
  }

  updateLikes() {
    // Removed likes functionality as it's not in the original design
  }

  render() {
    const description = this.getAttribute('description');
    const descriptionList = description ? JSON.parse(description) : [];

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: var(--bc2);
          color: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        #orderCheck {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(8px);
          border-radius: 0.75rem;
          overflow: hidden;
        }

        #orderTitle {
          color: white;
          padding: 1.5rem;
          font-size: 1.5rem;
          font-weight: 600;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          margin: 0;
        }

        #orderContent {
          padding: 2rem;
          color: white;
        }

        #artistSection {
          display: grid;
          grid-template-columns: minmax(160px, auto) 1fr;
          gap: 2rem;
          align-items: start;
        }

        #artistImage {
          width: 280px;
          height: 280px;
          border-radius: 0.75rem;
          object-fit: cover;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s ease;
        }

        #artistImage:hover {
          transform: scale(1.05);
        }

        #artistDetails {
          flex: 1;
        }

        #artistName {
          font-size: 2.5rem;
          margin: 0 0 1rem 0;
        }

        #eventTime {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 0.5rem;
          margin: 1rem 0;
          font-size: 1.125rem;
        }

        #eventDescription {
          margin: 1rem 0;
        }

        #eventDescription li {
          line-height: 1.6;
          opacity: 0.9;
          margin: 0.5rem 0;
          list-style: none;
        }

        #cancelOrderBtn {
          display: block;
          width: auto;
          min-width: 300px;
          margin: 1.5rem auto;
          padding: 0.75rem 2rem;
          background-color: #1e1b4b;
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-size: 1.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        #cancelOrderBtn:hover {
          background-color: #2d2a6b;
          transform: translateY(-1px);
        }

        #cancelOrderBtn:focus {
          outline: 2px solid white;
          outline-offset: 2px;
        }

        @media (max-width: 768px) {
          #artistSection {
            grid-template-columns: 1fr;
            text-align: center;
          }

          #artistImage {
            margin: 0 auto;
            width: 200px;
            height: 200px;
          }

          #artistName {
            font-size: 2rem;
          }

          #cancelOrderBtn {
            width: 100%;
            min-width: auto;
          }
        }

        @media (max-width: 480px) {
          #artistImage {
            width: 140px;
            height: 140px;
          }

          #artistName {
            font-size: 1.75rem;
          }

          #eventTime {
            font-size: 1rem;
            padding: 0.5rem 0.75rem;
          }
        }
      </style>
      <div id="orderCheck">
        <div id="orderContent">
          <div id="artistSection">
            <img id="artistImage" 
                 src="${this.getAttribute('image-url')}" 
                 alt="${this.getAttribute('artist-name')}"
                 onerror="this.src='/placeholder-image.jpg'">
            <div id="artistDetails">
              <h2 id="artistName">${this.getAttribute('artist-name')}</h2>
              <div id="eventTime">${new Date(this.getAttribute('event-time')).toLocaleString('mn-MN')}</div>
              <ul id="eventDescription">
                ${descriptionList.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          </div>
          <button id="cancelOrderBtn">Захиалга цуцлах</button>
        </div>
      </div>
    `;
  }
}

customElements.define('order-card', OrderCard);