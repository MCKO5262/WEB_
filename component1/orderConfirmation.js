export class OrderConfirmation extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._state = { status: 'pending', message: '', orderNumber: '', isVisible: false };
        console.log('OrderConfirmation component constructed');
    }

    connectedCallback() {
        console.log('OrderConfirmation connected to DOM');
        this.render();
        this.setupEventListeners();
    }

    show(status, message, orderNumber = '') {
        console.log('Show confirmation called:', { status, message, orderNumber });
        this._state = { status, message, orderNumber, isVisible: true };
        this.setAttribute('status', 'showing');
        this.updateUI();
    }

    hide() {
        console.log('Hiding confirmation');
        this._state = { ...this._state, isVisible: false };
        this.removeAttribute('status');
        this.dispatchEvent(new CustomEvent('confirmation-closed'));
    }

    updateUI() {
        if (!this.shadowRoot) {
            console.error('Shadow root not found');
            return;
        }

        const messageEl = this.shadowRoot.getElementById('statusMessage');
        const orderNumberEl = this.shadowRoot.getElementById('orderNumberDisplay');
        const statusIcon = this.shadowRoot.querySelector('.status-icon');
        const popup = this.shadowRoot.querySelector('.popup-container');

        if (!messageEl || !orderNumberEl || !statusIcon || !popup) {
            console.error('Required elements not found');
            return;
        }

        console.log('Updating UI with state:', this._state);

        messageEl.textContent = this._state.message;
        
        if (this._state.status === 'confirmed' && this._state.orderNumber) {
            orderNumberEl.textContent = `Захиалгын дугаар: ${this._state.orderNumber}`;
            statusIcon.className = 'status-icon confirmed';
        } else if (this._state.status === 'rejected') {
            orderNumberEl.textContent = '';
            statusIcon.className = 'status-icon rejected';
        }

        popup.style.display = this._state.isVisible ? 'flex' : 'none';
    }

    setupEventListeners() {
        const closeBtn = this.shadowRoot.querySelector('#closeBtn');
        const popupContainer = this.shadowRoot.querySelector('.popup-container');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                console.log('Close button clicked');
                this.hide();
            });
        }

        if (popupContainer) {
            popupContainer.addEventListener('click', (e) => {
                if (e.target === popupContainer) {
                    console.log('Background clicked');
                    this.hide();
                }
            });
        }
    }

    render() {
        const template = `
            <style>
                :host {
                    --bg-overlay: rgba(0, 0, 0, 0.5);
                    --popup-bg: #ffffff;
                    --success-color: #4CAF50;
                    --error-color: #f44336;
                    --primary-color: #007bff;
                }

                .popup-container {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: var(--bg-overlay);
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }

                .popup {
                    background: var(--popup-bg);
                    padding: 2rem;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    max-width: 90%;
                    width: 400px;
                    text-align: center;
                    position: relative;
                }

                .status-icon {
                    font-size: 48px;
                    margin-bottom: 1rem;
                    line-height: 1;
                }

                .status-icon.confirmed::before {
                    content: '✓';
                    color: var(--success-color);
                }

                .status-icon.rejected::before {
                    content: '×';
                    color: var(--error-color);
                }

                #statusMessage {
                    font-size: 1.2rem;
                    margin: 1rem 0;
                }

                #orderNumberDisplay {
                    font-size: 1.1rem;
                    color: #666;
                    margin: 0.5rem 0;
                }

                #closeBtn {
                    margin-top: 1.5rem;
                    padding: 0.75rem 1.5rem;
                    border: none;
                    border-radius: 4px;
                    background: var(--primary-color);
                    color: white;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: background-color 0.3s ease;
                }

                #closeBtn:hover {
                    background: #0056b3;
                }
            </style>
            <div class="popup-container">
                <div class="popup">
                    <div class="status-icon"></div>
                    <div id="messageContainer">
                        <p id="statusMessage"></p>
                        <p id="orderNumberDisplay"></p>
                    </div>
                    <button id="closeBtn">Хаах</button>
                </div>
            </div>
        `;

        this.shadowRoot.innerHTML = template;
        console.log('Confirmation component rendered');
    }
}
