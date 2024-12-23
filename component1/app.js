// app.js
export class OrderApp {
    constructor() {
        this.setupComponents(); // Компонентуудыг инициалчлах
        this.setupEventListeners(); // Үйл явдлын сонсогчдыг тохируулах
        this.loadInitialTheme(); // Эхний загварыг ачаалах
    }

    setupComponents() {
        this.form = document.querySelector('order-form'); // OrderForm компонентыг DOM-оос сонгоно
        this.confirmation = document.querySelector('order-confirmation'); // OrderConfirmation компонентыг DOM-оос сонгоно
    }

    setupEventListeners() {
        document.addEventListener('order-submit', this.handleOrderSubmit.bind(this)); // Захиалга илгээх үйл явдалд хариу үйлдэл
        document.addEventListener('form-input', this.handleFormInput.bind(this)); // Формын оролтын өөрчлөлт
        document.addEventListener('confirmation-closed', this.handleConfirmationClosed.bind(this)); // Баталгаажуулах модал хаах

        const themeSwitch = document.getElementById('theme-switch'); // Загвар солих товч
        if (themeSwitch) {
            themeSwitch.addEventListener('click', this.toggleTheme.bind(this)); // Загвар солих үйл явдлыг сонсох
        }
    }

    loadInitialTheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; // Dark mode тохиргоог шалгах
        if (prefersDark) {
            this.setTheme('dark'); // Хэрэв dark mode тохиргоотой бол dark theme тохируулах
        }
    }

    setTheme(theme) {
        document.body.classList.toggle('dark-mode', theme === 'dark'); // Body дээр dark mode class-ыг нэмэх/хасах
        this.form?.setAttribute('theme', theme); // Form-д theme тохируулах

        // Загварын өнгийг шинэчлэх
        document.documentElement.style.setProperty('--background-color', theme === 'dark' ? '#333333' : '#ffffff');
        document.documentElement.style.setProperty('--text-color', theme === 'dark' ? '#ffffff' : '#000000');
    }

    handleFormInput(event) {
        console.log('Form input changed:', event.detail); // Формын оролтын өөрчлөлтийг бүртгэх
    }

    handleConfirmationClosed() {
        this.form?.setAttribute('state', ''); // Формын төлвийг дахин анхдагч болгож тохируулах
    }

    async handleOrderSubmit(event) {
        try {
            const response = await this.submitOrder(event.detail); // Захиалгын өгөгдлийг серверт илгээх
            this.confirmation?.show('confirmed', 'Захиалга амжилттай баталгаажлаа!', '123456'); // Амжилттай мессеж
        } catch (error) {
            this.confirmation?.show('rejected', 'Захиалга амжилтгүй боллоо. Дахин оролдоно уу.'); // Алдааны мессеж
        } finally {
            this.form?.setAttribute('state', ''); // Формыг дахин ашиглах боломжтой болгох
        }
    }

    async submitOrder(orderData) {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData) // JSON өгөгдөл илгээх
        });

        if (!response.ok) {
            throw new Error('Order submission failed'); // Алдаа гарсан тохиолдолд алдаа үүсгэх
        }

        return response.json(); // Серверээс хариу өгөгдөл авах
    }

    toggleTheme() {
        const isDark = document.body.classList.toggle('dark-mode'); // Загвар солих (dark/light)
        this.setTheme(isDark ? 'dark' : 'light'); // Theme тохируулах
    }
}
