// app.js
export class OrderApp {
    constructor() {
        // Custom elements бүртгэгдсэн эсэхийг баталгаажуулахын тулд бага зэрэг хүлээнэ
        setTimeout(() => this.initialize(), 0);
        this.artist_id = this.getArtistIdFromUrl() || this.getStoredArtistId();
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
    initialize() {
        // Захиалгын форм болон баталгаажуулалтын хэсгийг DOM-аас хайж олох
        this.form = document.querySelector('order-form');
        this.confirmation = document.querySelector('order-confirmation');
        
        // Хэрэв шаардлагатай элементүүд олдоогүй бол алдаа харуулах
        if (!this.form || !this.confirmation) {
            console.error('Шаардлагатай компонентууд олдсонгүй:', {
                form: !!this.form,
                confirmation: !!this.confirmation
            });
            return;
        }
        // Арга хэмжээний сонсогчдыг тохируулах
        this.setupEventListeners();
        console.log('OrderApp хийгдлээ:', {
            form: this.form,
            confirmation: this.confirmation
        });
    }

    setupEventListeners() {
        // Захиалга илгээх үйлдлийн сонсогчийг бүртгэх
        this.form.addEventListener('order-submit', this.handleOrderSubmit.bind(this));
    }

    async handleOrderSubmit(event) {
        // Захиалгын өгөгдлийг эвентийн `detail`-ээс хүлээн авах
        const formData = event.detail;
        console.log('Захиалга илгээж байна:', formData);
        
        if (!this.artist_id) {
            this.showConfirmation(
                'rejected', 
                'Artist ID not found. Please try again from the artist\'s page.'
            );
            return;
        }
        // Формын төлөвийг "илгээж байна" болгон өөрчлөх
        this.form?.setAttribute('state', 'submitting');
        
        try {
            // Захиалгын өгөгдлийг JSON форматаар бэлтгэх
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

            // Сервер рүү HTTP POST хүсэлт илгээх
            const response = await fetch('http://localhost:3000/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPayload) // JSON форматтай өгөгдөл илгээх
            });

            // Серверээс ирсэн хариуг унших
            const result = await response.json();
            console.log('Серверийн хариу:', result);

            if (!response.ok) {
                throw new Error(result.details || 'Захиалгыг илгээхэд алдаа гарлаа');
            }

            // Амжилттай бол баталгаажуулалтын попап харуулах
            console.log('Баталгаажуулалтын попап харуулж байна');
            this.showConfirmation(
                'confirmed', 
                'Захиалга амжилттай баталгаажлаа!', 
                result.data.order_code
            );
            
            // Формыг цэвэрлэх
            if (this.form) {
                const formElement = this.form.shadowRoot?.querySelector('form');
                formElement?.reset();
                /*if (this.form):this.form (гадна талаас order-form элемент) байгаа эсэхийг шалгана. Хэрэв байхгүй бол доорх үйлдлийг гүйцэтгэхгүй.this.form.shadowRoot?.querySelector('form'):order-form гэдэг custom элемент нь Shadow DOM ашигладаг байж магадгүй.shadowRoot-ыг ашиглан тухайн элемент доторх агуулга руу хандана.querySelector('form')-ийг ашиглан Shadow DOM доторх <form> элементийг олно.
                formElement?.reset():formElement элемент нь HTML формыг илэрхийлэх элемент байх бөгөөд энэ элементийн
                reset() функц нь HTML формын бүх оруулга (input), сонголт (select), шалгуур (checkbox) гэх мэт талбаруудыг анхдагч утгаар нь буцаана.
                Жишээ нь, хэрэв хэрэглэгч формыг бөглөөд "Илгээх" товч дарсан бол энэ функц нь формыг дахин цэвэрлэж, хоослох болно.*/
            }
            
        } catch (error) {
            // Алдаа гарвал хэрэглэгчид мэдэгдэх
            console.error('Захиалгыг илгээхэд алдаа гарлаа:', error);
            this.showConfirmation(
                'rejected', 
                'Захиалга амжилтгүй боллоо. Дахин оролдоно уу.'
            );
        } finally {
            // Формын төлөвийг анхны байдалд оруулах
            this.form?.setAttribute('state', '');
        }
    }

    showConfirmation(status, message, orderCode = '') {
        // Баталгаажуулалтын хэсгийг харуулах эсвэл алдааны мессеж гаргах
        console.log('Баталгаажуулалтыг харуулж байна:', { status, message, orderCode });
        if (this.confirmation) {
            this.confirmation.show(status, message, orderCode);
        } else {
            console.error('Баталгаажуулалтын компонент олдсонгүй');
            alert(message); // Компонент байхгүй үед fallback
        }
    }

    validateFormData(formData) {
        // Шаардлагатай талбаруудыг шалгах
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

        // И-мэйл хаягийн форматыг шалгах
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            console.error('И-мэйл хаяг буруу байна');
            return false;
        }

        // Утасны дугаарын форматыг шалгах (8 оронтой байх шаардлагатай)
        const phoneRegex = /^[0-9]{8}$/;
        if (!phoneRegex.test(formData.phone)) {
            console.error('Утасны дугаарын формат буруу байна');
            return false;
        }

        return true;
    }
}

