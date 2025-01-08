// app.js
export class OrderApp {
    constructor() {
        this.artist_id = this.getArtistIdFromUrl();
    }
    getArtistIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const artistId = urlParams.get('id');
        return artistId;
    }
    initialize() {
        this.form = document.querySelector('order-form');
        this.confirmation = document.querySelector('order-confirmation');
        if (!this.form || !this.confirmation) {
            console.error('Шаардлагатай компонентууд олдсонгүй:', {
                form: !!this.form,
                confirmation: !!this.confirmation
            });
            return;
        }
        this.setupEventListeners();
        console.log('OrderApp хийгдлээ:', {
            form: this.form,
            confirmation: this.confirmation
        });
    }

    setupEventListeners() {
        this.form.addEventListener('order-submit', this.handleOrderSubmit.bind(this));
    }
    async handleOrderSubmit(event) {
        const formData = event.detail;
        console.log('Захиалга илгээж байна:', formData);
        
        if (!this.artist_id) {
            this.showConfirmation(
                'rejected', 
                'Artist ID not found. Please try again from the artist\'s page.'
            );
            return;
        }
        this.form?.setAttribute('state', 'submitting');
        
        try {
            const orderPayload = {
                artist_id: this.artist_id,
                phone: formData.phone,
                fullname: formData.fullName,
                email: formData.email,
                organization_name: formData.organization_name,
                representative_name: formData.representative_name,
                billing_address: formData.billing_address,
                event_type: formData.eventType,
                event_name_and_features: formData.specialRequests || formData.eventType,
                event_date: formData.eventDate,
                event_location: formData.location,
                total_amount: parseFloat(formData.totalAmount) || 0,
                artist_availability: formData.artistAvailability,
                special_requests: formData.specialRequests
            };

            const response = await fetch('http://localhost:3000/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPayload) // JSON ugugdul oruulah
            });

            const result = await response.json();
            console.log('Серверийн хариу:', result);

            if (!response.ok) {
                throw new Error(result.details || 'Захиалгыг илгээхэд алдаа гарлаа');
            }

            console.log('Баталгаажуулалтын попап харуулж байна');
            this.showConfirmation(
                'confirmed', 
                'Захиалга амжилттай баталгаажлаа!', 
                result.data.order_code
            );
            
            if (this.form) {
                const formElement = this.form.shadowRoot?.querySelector('form');
                formElement?.reset();

            }
            
        } catch (error) {
            console.error('Захиалгыг илгээхэд алдаа гарлаа:', error);
            this.showConfirmation(
                'rejected', 
                'Захиалга амжилтгүй боллоо. Дахин оролдоно уу.'
            );
        } finally {
            this.form?.setAttribute('state', '');
        }
    }

    showConfirmation(status, message, orderCode = '') {

        console.log('Баталгаажуулалтыг харуулж байна:', { status, message, orderCode });
        if (this.confirmation) {
            this.confirmation.show(status, message, orderCode);
        } else {
            console.error('Баталгаажуулалтын компонент олдсонгүй');
            alert(message); // Компонент байхгүй үед fallback
        }
    }

    validateFormData(formData) {
        const requiredFields = [
            'phone',
            'fullName',
            'email',
            'organization_name',
            'representative_name',
            'billing_address',
            'eventType',
            'eventDate',
            'location'
        ];

        const missingFields = requiredFields.filter(field => !formData[field]);
        
        if (missingFields.length > 0) {
            console.error('Дутуу талбарууд:', missingFields);
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            console.error('И-мэйл хаяг буруу байна');
            return false;
        }

        const phoneRegex = /^[0-9]{8}$/;
        if (!phoneRegex.test(formData.phone)) {
            console.error('Утасны дугаарын формат буруу байна');
            return false;
        }

        return true;
    }
}

