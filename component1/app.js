// app.js
export class OrderApp {
    constructor() {
        // Wait for a moment to ensure custom elements are defined
        setTimeout(() => this.initialize(), 0);
    }

    initialize() {
        this.form = document.querySelector('order-form');
        this.confirmation = document.querySelector('order-confirmation');
        
        if (!this.form || !this.confirmation) {
            console.error('Required components not found:', {
                form: !!this.form,
                confirmation: !!this.confirmation
            });
            return;
        }

        this.setupEventListeners();
        console.log('OrderApp initialized with components:', {
            form: this.form,
            confirmation: this.confirmation
        });
    }

    setupEventListeners() {
        this.form.addEventListener('order-submit', this.handleOrderSubmit.bind(this));
        console.log('Event listeners set up');
    }

    async handleOrderSubmit(event) {
        const formData = event.detail;
        console.log('Handling order submit:', formData);
        
        if (!formData) {
            console.error('No form data received');
            return;
        }

        this.form?.setAttribute('state', 'submitting');
        
        try {
            // Create a more comprehensive order payload with all user fields
            const orderPayload = {
                // User Information
                phone: formData.phone,
                fullname: formData.fullName,
                email: formData.email,
                organization_name: formData.organization_name,
                representative_name: formData.representative_name,
                billing_address: formData.billing_address,

                // Event Information
                event_type: formData.eventType,
                event_name_and_features: formData.specialRequests || formData.eventType,
                event_date: formData.eventDate,
                event_location: formData.location,
                total_amount: parseFloat(formData.totalAmount) || 0,
                artist_availability: formData.artistAvailability,

                // Additional Information
                special_requests: formData.specialRequests
            };

            console.log('Sending order payload:', orderPayload);

            const response = await fetch('http://localhost:3000/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPayload)
            });

            const result = await response.json();
            console.log('Server response:', result);

            if (!response.ok) {
                throw new Error(result.details || 'Order submission failed');
            }

            // Show success confirmation with order code
            console.log('Showing confirmation popup');
            this.showConfirmation(
                'confirmed', 
                'Захиалга амжилттай баталгаажлаа!', 
                result.data.order_code
            );
            
            // Reset form after successful submission
            if (this.form) {
                const formElement = this.form.shadowRoot?.querySelector('form');
                formElement?.reset();
            }
            
        } catch (error) {
            console.error('Order submission error:', error);
            this.showConfirmation(
                'rejected', 
                'Захиалга амжилтгүй боллоо. Дахин оролдоно уу.'
            );
        } finally {
            this.form?.setAttribute('state', '');
        }
    }

    showConfirmation(status, message, orderCode = '') {
        console.log('Showing confirmation:', { status, message, orderCode });
        if (this.confirmation) {
            this.confirmation.show(status, message, orderCode);
        } else {
            console.error('Confirmation component not found');
            alert(message); // Fallback if component isn't available
        }
    }

    // Helper method to validate form data
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
            console.error('Missing required fields:', missingFields);
            return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            console.error('Invalid email format');
            return false;
        }

        // Validate phone number (assuming 8-digit format)
        const phoneRegex = /^[0-9]{8}$/;
        if (!phoneRegex.test(formData.phone)) {
            console.error('Invalid phone number format');
            return false;
        }

        return true;
    }
}