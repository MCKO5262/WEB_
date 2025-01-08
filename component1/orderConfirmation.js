export class OrderConfirmation extends HTMLElement {
    constructor() {
        super(); 
        this.artist_id = this.getArtistIdFromUrl() || this.getStoredArtistId();
        this.attachShadow({ mode: 'open' }); // Shadow DOM-г нээж, тусгаарлагдсан DOM бүтээнэ
        this._state = { 
            status: 'pending',
            message: '', 
            orderNumber: '', 
            isVisible: false 
        };
        console.log('OrderConfirmation component constructed'); // Консол дээр мессеж бичнэ
    }
    getArtistIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const artistId = urlParams.get('id');
        console.log('Artist ID from URL:', artistId);
        return artistId;
    }
    getStoredArtistId() {
        return sessionStorage.getItem('currentArtistId');
    }

    connectedCallback() {
        // Компонент DOM-д холбогдсон үед дуудагдана
        console.log('OrderConfirmation connected to DOM');
        this.render(); 
        this.setupEventListeners(); // Үйлдлийн сонсогчид нэмнэ
    }

    show(status, message, orderNumber = '') {
        // Баталгаажуулалтын мессеж харуулах
        console.log('Show confirmation called:', { status, message, orderNumber });
        this._state = { status, message, orderNumber, isVisible: true }; // Төлөв шинэчлэх
        this.setAttribute('status', 'showing'); // HTML атрибут шинэчлэх
        this.updateUI(); // UI-г шинэчилж харуулах
    }

    hide() {
        // Баталгаажуулалтын мессеж нуух
        console.log('Hiding confirmation');
        this._state = { ...this._state, isVisible: false }; // Харагдах байдлыг false болгоно
        this.removeAttribute('status'); // 'status' атрибутыг устгана
        this.dispatchEvent(new CustomEvent('confirmation-closed')); // Компонент хаагдсаныг мэдээлэх эвент үүсгэнэ
    }

    updateUI() {
        // UI-г шинэчлэх
        if (!this.shadowRoot) {
            console.error('Shadow root not found'); // Shadow DOM олдохгүй бол алдаа бичих
            return;
        }

        // UI элементүүдийг Shadow DOM-оос олох
        const messageEl = this.shadowRoot.getElementById('statusMessage');
        const orderNumberEl = this.shadowRoot.getElementById('orderNumberDisplay');
        const statusIcon = this.shadowRoot.querySelector('.status-icon');
        const popup = this.shadowRoot.querySelector('.popup-container');

        if (!messageEl || !orderNumberEl || !statusIcon || !popup) {
            console.error('Required elements not found'); // Шаардлагатай элементүүд олдохгүй бол алдаа бичих
            return;
        }

        messageEl.textContent = this._state.message;

        if (this._state.status === 'confirmed' && this._state.orderNumber) {
            // Амжилттай баталгаажуулалт
            orderNumberEl.textContent = `Захиалгын дугаар: ${this._state.orderNumber}`;
            statusIcon.className = 'status-icon confirmed';
        } else if (this._state.status === 'rejected') {
            orderNumberEl.textContent = '';
            statusIcon.className = 'status-icon rejected'; 
        }

        popup.style.display = this._state.isVisible ? 'flex' : 'none';
    }

    setupEventListeners() {
        // Үйлдлийн сонсогчид бүртгэх
        const closeBtn = this.shadowRoot.querySelector('#closeBtn'); // Хаах товчийг олох
        const popupContainer = this.shadowRoot.querySelector('.popup-container'); // Попап контейнерыг олох

        if (closeBtn) {
            // Хаах товчинд сонсогч нэмэх
            closeBtn.addEventListener('click', () => {
                this.hide(); 
            });
        }

        if (popupContainer) {
            // Попапын гадна дарах үед нуух
            popupContainer.addEventListener('click', (e) => {
                if (e.target === popupContainer) {
                    this.hide(); // Попап нуух
                }
            });
        }
    }

    render() {
        const template = `
            <style>
            @import url(./global.css);
            .popup-container {
            display: none;
            position: fixed;
            inset: 0; /* Shorter than setting top, right, bottom, left */
            background: rgba(0, 0, 0, 0.75); /* Darker overlay for better contrast */
            align-items: center;
            justify-content: center;
            z-index: 1000;
            backdrop-filter: blur(4px); /* Adds depth to the overlay */
            transition: opacity var(--transition-speed) var(--transition-timing);
            }

            .popup {
            background: var(--bc1);
            color: var(--txtc);
            padding: var(--padding);
            border-radius: 16px;
            box-shadow: var(--box-shadow);
            max-width: min(90%, 400px); /* More responsive approach */
            width: 100%;
            text-align: center;
            position: relative;
            animation: popup-enter 0.3s var(--transition-timing);
            border: 1px solid var(--third-color);
            text-decoration: none;
            }

            .status-icon {
            font-size: 4rem;
            margin-bottom: 1.5rem;
            line-height: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 80px;
            }

            .status-icon.confirmed::before {
            content: '✔';
            color: #4ade80;
            animation: icon-enter 0.4s var(--transition-timing);
            }

            .status-icon.rejected::before {
            content: '×';
            color: #f87171;
            animation: icon-enter 0.4s var(--transition-timing);
            }

            #statusMessage {
            font-size: 1.8rem;
            margin: 1rem 0;
            color: var(--txtc);
            font-family: var(--font-family);
            }

            #orderNumberDisplay {
            font-size: 1.8rem;
            color: var(--neutral-color);
            margin: 0.5rem 0;
            font-family: var(--font-family);
            }

            .closeBtn {
            text-decoration: none;
            margin-top: 1.5rem;
            padding: 0.75rem 2rem;
            border: none;
            border-radius: 25px;
            background: var(--fourth-color);
            color: var(--txtc);
            cursor: pointer;
            font-size: 1rem;
            font-family: var(--font-family);
            transition: all var(--transition-speed) var(--transition-timing);
            box-shadow: var(--box-shadow);
            }
            .closeBtn a {
                text-decoration: none;
                color: var(--txtc)
            }
            .closeBtn:hover {
            background: var(--hover-dark-neutral);
            transform: translateY(-2px);
            }

            .closeBtn:active {
            transform: translateY(0);
            }

            /* Animations */
            @keyframes popup-enter {
            from {
                opacity: 0;
                transform: scale(0.95) translateY(10px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
            }

            @keyframes icon-enter {
            from {
                opacity: 0;
                transform: scale(0.5);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
            }

            /* Media Queries */
            @media screen and (max-width: 768px) {
            .popup {
                padding: calc(var(--padding) * 0.75);
            }
            
            .status-icon {
                font-size: 2.5rem;
                height: 60px;
            }
            
            #statusMessage {
                font-size: 1.1rem;
            }
            
            #orderNumberDisplay {
                font-size: 1rem;
            }
            }
            @media (prefers-reduced-motion: reduce) {
            .popup,
            .status-icon.confirmed::before,
            .status-icon.rejected::before,
            #closeBtn {
                animation: none;
                transition: none;
            }
            }
            .darkmode .popup {
            background: var(--bc1);
            border-color: var(--third-color);
            }
            </style>
            <div class="popup-container">
                <div class="popup">
                    <div class="status-icon"></div>
                    <div id="messageContainer">
                        <p id="statusMessage"></p>
                        <p id="orderNumberDisplay"></p>
                    </div>
                    <button class="closeBtn"><a href="Sanalhuselt.html?id=${this.artist_id}">Хаах</a></button>
                </div>
            </div>
        `;
        this.shadowRoot.innerHTML = template;
        console.log('Confirmation component rendered');
    }
}
