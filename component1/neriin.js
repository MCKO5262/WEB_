export class ArtistProfile extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._state = {
            artistData: {
                name: '',
                image: '',
                likes: ''
            }
        };
    }

    async connectedCallback() {
        const urlParams = new URLSearchParams(window.location.search);
        const urlArtistId = parseInt(urlParams.get('id'), 10);
        const attributeArtistId = parseInt(this.getAttribute('artist-id'), 10);
        
        const artistId = attributeArtistId || urlArtistId;

        if (artistId) {
            await this.fetchArtistData(artistId);
        }

        this.render();
        this.setupEventListeners();
    }

    async fetchArtistData(artistId) {
        try {
            const response = await fetch('http://localhost:3000/api/artists', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const data = await response.json();

                const artist = data.data.find(artist => artist.id === artistId);
                if (artist) {
                    this._state.artistData = {
                        name: artist.name || '',
                        image: artist.image || '',
                        likes: artist.likes
                    };
                } else {
                    console.warn('Artist not found');
                }
            } else {
                console.error('Failed to fetch artist data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching artist data:', error);
        }
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
    disconnectedCallback() {
        console.log('');
    }

    static get observedAttributes() {
        return ['artist-id']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'artist-id' && oldVal !== newVal) {
            console.log(`Artist ID changed from ${oldVal} to ${newVal}`);
            this.fetchArtistData(newVal);
        }
    }

    adoptedCallback() {
    }


    render() {
        this.shadowRoot.innerHTML = `
            <style>
            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                }
                html, body {
                overflow-x: hidden; 
                overflow-y: auto;
                }
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
            h3 {
                text-align : center;
            }
            .Neriin_huudas h2 {
                text-align : center;
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
            @media screen and (max-width: 430px) and (orientation: portrait) {
                .Neriin_huudas img {
                    width: 8rem; 
                    height: 8rem;
                    margin-bottom: 0.7rem;
                }
                .Neriin_huudas h2 {
                    font-size: 1.5rem; 
                }
                .stars {
                    font-size: 1rem;
                }
                .Huvari_harah {
                    font-size: 0.9rem;
                    padding: 0.6em 1.8em;
                }
            }
            </style>
            <section class="Neriin_huudas">
                <img class="artist-image" 
                     src="${this._state.artistData.image || ''}" 
                     alt="${this._state.artistData.name || 'Artist'}'s Image">
                <h2 class="artist-name">${this._state.artistData.name || ''}</h2>
                <h3> 💖${this._state.artistData.likes}</h3>

            </section>
        `;
    }
}

customElements.define('artist-profile', ArtistProfile);




