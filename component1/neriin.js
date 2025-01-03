export class ArtistProfile extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._state = {
            artistData: {
                name: '',
                image: ''
            }
        };
    }

    static get observedAttributes() {
        return ['artist-name', 'image'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'artist-name':
                this._state.artistData.name = newValue;
                break;
            case 'image':
                this._state.artistData.image = newValue;
                break;
        }
        this.updateUI();
    }

    updateUI() {
        if (!this.shadowRoot) return;

        const artistImage = this.shadowRoot.querySelector('.artist-image');
        const artistName = this.shadowRoot.querySelector('.artist-name');

        if (artistImage) {
            artistImage.src = this._state.artistData.image || '';
            artistImage.alt = `${this._state.artistData.name || 'Artist'}'s Image`;
        }

        if (artistName) {
            artistName.textContent = this._state.artistData.name || '';
        }
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const scheduleBtn = this.shadowRoot.querySelector('.Huvari_harah');
        if (scheduleBtn) {
            scheduleBtn.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('view-schedule', {
                    bubbles: true,
                    composed: true
                }));
            });
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .Neriin_huudas {
                display: grid;
                background-color: var(--third-color);
                padding: 1.5rem;
                border-radius: 1rem;
                margin-bottom: 2rem;
                width: 100%;
                max-width: 25rem;
                grid-template-columns: 1fr 1fr;
                grid-template-areas: 
                "zrg ner"
                "zrg unelgee"
                "zrg huvaari";
            }

            .Neriin_huudas img {
                width: 10rem;
                height: 10rem;
                border-radius: 1rem;
                margin-bottom: 1rem;
                object-fit: cover;
                grid-area: zrg;
            }

            .Neriin_huudas h2 {
                font-size: 2rem;
                margin: 0.5rem 0;
                color: white;
                grid-area: ner;
                justify-self: center;
            }

            .stars {
                color: gold;
                font-size: 1.2rem;
                margin: 0.5rem 0;
                grid-area: unelgee;
                justify-self: center;
                scale: 1.3;
                text-shadow: 2px 2px 5px gold;
            }

            .Huvari_harah {
                background-color: rgba(0, 0, 0, 0.3);
                color: white;
                padding: 0.7em 2em;
                border: none;
                border-radius: 2rem;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.3s ease;
                grid-area: huvaari;
                align-self: center;
            }

            .Huvari_harah:hover {
                background-color: rgba(0, 0, 0, 0.4);
            }

            </style>

            <section class="Neriin_huudas">
                <img class="artist-image" 
                     src="${this._state.artistData.image || ''}" 
                     alt="${this._state.artistData.name || 'Artist'}'s Image">
                <h2 class="artist-name">${this._state.artistData.name || ''}</h2>
                <div class="stars">★★★★★</div>
                <button class="Huvari_harah">Хуваарь харах</button>
            </section>
        `;
    }
}

customElements.define('artist-profile', ArtistProfile);