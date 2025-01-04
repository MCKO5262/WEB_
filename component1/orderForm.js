export class OrderForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }); // Shadow DOM үүсгэх
    this._state = {
      isSubmitting: false, // Илгээж буй байдал
      formData: {}, // Формын өгөгдөл
    };
  }


  static get observedAttributes() {
    return ["theme", "state"]; // "theme" болон "state" аттрибутыг хянах
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "theme") {
      this.updateTheme(newValue); // Theme шинэчлэгдсэн үед
    } else if (name === "state") {
      this.updateState(newValue); // state шинэчлэгдсэн үед
    }
  }


  updateTheme(theme) {
    if (this.shadowRoot) {
      const container = this.shadowRoot.querySelector(".form-container");
      if (container) {
        container.setAttribute("data-theme", theme); // theme утга асуултаар шинэчлэх
      }
    }
  }


  updateState(state) {
    this._state.isSubmitting = state === "submitting"; // Илгээж буй байдал шалгах
    this.updateUI(); // UI-г шинэчлэх
  }


  updateUI() {
    if (!this.shadowRoot) return;
    const submitButton = this.shadowRoot.querySelector(".submit-button");
    if (submitButton) {
      submitButton.disabled = this._state.isSubmitting; // Илгээж буй үед товчийг хаах
      submitButton.textContent = this._state.isSubmitting
        ? "Илгээж байна..."
        : "Захиалга илгээх"; // Товчийн текстийг өөрчлөх
    }
  }


  connectedCallback() {
    this.render(); // Компонентыг render хийх
    this.setupEventListeners(); // Үйлдлийн сонсогчийг тохируулах
    const theme = this.getAttribute("theme");
    if (theme) {
      this.updateTheme(theme); // Эхний theme-г хэрэглэж байна
    }
  }


  setupEventListeners() {
    const form = this.shadowRoot.querySelector("#orderForm");
    if (form) {
      form.addEventListener("submit", this.handleSubmit.bind(this));
      form.addEventListener("input", this.handleInput.bind(this)); // Инпут өгөгдөл өөрчлөгдөх үед
    }
  }


  handleInput(event) {
    const { name, value } = event.target;
    this._state.formData[name] = value; // Формаас өгөгдөл авах
    this.validateField(event.target); // Өгөгдлийг шалгах
  }

  validateField(field) {
    const errorElement = this.shadowRoot.querySelector(
      `.validation-error[data-for="${field.name}"]`
    );
    if (!errorElement) return true;

    let isValid = true;

    if (field.required && !field.value) {
      errorElement.textContent = "Энэ талбарыг бөглөх шаардлагатай";
      errorElement.classList.add("show");
      isValid = false;
    } else if (
      field.type === "email" &&
      field.value &&
      !this.validateEmail(field.value)
    ) {
      errorElement.textContent = "Зөв и-мэйл хаяг оруулна уу";
      errorElement.classList.add("show");
      isValid = false;
    } else if (
      field.type === "tel" &&
      field.value &&
      !this.validatePhone(field.value)
    ) {
      errorElement.textContent = "Зөв утасны дугаар оруулна уу";
      errorElement.classList.add("show");
      isValid = false;
    } else {
      errorElement.classList.remove("show");
    }

    return isValid;
  }

  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  validatePhone(phone) {
    return /^[0-9]{8}$/.test(phone);
  }
  //handleSubmit функц нь формын өгөгдлийг шалгаж, зөв бол илгээх үйлдлийг гүйцэтгэнэ. Хэрэв оруулсан өгөгдөл буруу байвал хэрэглэгчийн өгөгдөл баталгаажих хүртэл илгээхгүй.
  handleSubmit(event) {
    event.preventDefault(); /*preventDefault() нь формын энэ стандарт үйлдлийг зогсооно. Энэ нь браузерын автоматаар формаар өгөгдөл илгээх үйлдлийг хааж, 
    өөрийн бичсэн логикыг гүйцэтгэх боломжийг олгодог. Жишээ нь, хэрэглэгчийн илгээсэн формын өгөгдлийг сервер рүү шууд явуулах биш, эхлээд шалгаж байгаа.*/

    const form = event.target;
    let isValid = true;

    // Бүх талбаруудыг шалгах
    Array.from(form.elements).forEach((field) => {
      if (field.name) {
        isValid = this.validateField(field) && isValid;
      }
    });
    /*Формын бүх элементийг дамжиж, validateField(field) функцэд тус бүрийн талбарыг шалгах зорилгоор дамжуулна.
    form.elements нь бүх формын оролт (input, select гэх мэт) элементийн цуглуулга юм.
    Array.from(form.elements) нь энэ цуглуулгыг бодит массив болгон хөрвүүлж, forEach функцээр бүрт нэг бүрчлэн шалгаж байна.
    validateField(field) нь тухайн талбарын утга зөв эсэхийг шалгах функц юм. Шалгалт амжилтгүй бол isValid утга false болно.*/

    if (!isValid) return; // Хэрэв баталгаажуулалт амжилтгүй бол илгээхгүй

    // Өгөгдлийг авах
    const formData = new FormData(form);
    //Object.fromEntries(formData) нь FormData-ийн өгөгдлийг стандарт JavaScript объект болгож хөрвүүлнэ.
    const data = Object.fromEntries(formData);

    // dispatchEvent нь шинэ CustomEvent үүсгэж, илгээх үйлдлийг гүйцэтгэнэ.
    this.dispatchEvent(
      new CustomEvent("order-submit", {
        detail: data,
        bubbles: true,
        composed: true,
      })
    );
  }


  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url(./global.css);
:host {
  display: block;
  width: 100%;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  width: 100%;
  margin: 0 auto;
  max-width: 1200px;
  }

form {
  display: grid;
  gap: var(--padding);
  width: 100%;
  padding: calc(var(--padding) * 2);
  align-items: start;
  border-radius: 16px;
  background-color: var(--third-color);
  margin: 0 auto;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;
}

form h3 {
  grid-column: 1 / -1;
  color: var(--color-text);
  text-align: center;
  margin-bottom: calc(var(--padding) * 1.5);
  font-size: 1.5rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.form-section {
  margin-bottom: 2.5rem;
  width: 100%;
}

label {
  display: flex;
  flex-direction: column;
  font-size: large;
  gap: 0.75rem;
  color: var(--txtc);
  width: 100%;
}

input[type="text"],
input[type="tel"],
input[type="number"],
input[type="date"],
input[type="email"],
input[type="datetime-local"],
textarea,
select {
  border: none;
  padding: 1rem var(--padding);
  border-radius: 16px;
  color: var(--txtc);
  font-size: large;
  width: 100%;
  transition: all 0.3s ease;
  background-color: rgba(0, 0, 0, 0.1);
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  background-color: rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
}

input::placeholder,
select::placeholder,
textarea::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

textarea {
  resize: none;
  height: 8rem;
  min-height: 5rem;
}

.submit-button {
  grid-column: 1 / -1;
  justify-self: center;
  background-color: var(--secondary-color);
  color: var(--txtc);
  padding: 1em 3em;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  font-size: 24px;
  transition: all 0.3s ease;
  margin-top: calc(var(--padding) * 2);
  width: auto;
  min-width: 200px;
}

.submit-button:hover {
  background-color: var(--secondary-color);
  transform: scale(1.05);
}

.validation-error {
  color: var(--error-color, rgba(236, 38, 38, 0.84));
  font-size: 0.875rem;
  margin-top: 4px;
  display: none;
}

.validation-error.show {
  display: block;
}

.header-slot::slotted(h2) {
  color: var(--txtc);
  margin: 0 0 2rem 0;
  font-size: 1.5rem;
  text-align: center;
  width: 100%;
}

:host([state="submitting"]) .form-container {
  opacity: 0.7;
  pointer-events: none;
}

@media (max-width: 768px) {
  .form-container {
    padding: 1rem;
  }
  
  form {
    grid-template-columns: 1fr;
    padding: var(--padding);
    max-width: 100%;
  }

  .submit-button {
    width: 100%;
    margin-top: var(--padding);
  }
  
  .form-section {
    margin-bottom: 2rem;
  }
}* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html, body {
  overflow-x: hidden; 
  overflow-y: auto;
}
      </style>
      <main>
      <div class="form-container">
      <div class="header-slot">
        <slot name="header"></slot>
      </div>
      <form id="orderForm" novalidate>
        <div class="form-section">
          <h3>1. Хэрэглэгчийн мэдээлэл</h3>
          <div class="form-grid">
            <label>
              Овог, нэр: *
              <input type="text" name="fullName" required placeholder="Хариулт оруулах">
              <span class="validation-error" data-for="fullName">Овог нэрээ оруулна уу</span>
            </label>
            <label>
              Холбогдох утасны дугаар: *
              <input type="tel" name="phone" required placeholder="Хариулт оруулах" pattern="[0-9]{8}">
              <span class="validation-error" data-for="phone">Зөв утасны дугаар оруулна уу</span>
            </label>
            <label>
              И-мэйл хаяг: *
              <input type="email" name="email" required placeholder="Хариулт оруулах">
              <span class="validation-error" data-for="email">Зөв и-мэйл хаяг оруулна уу</span>
            </label>
            <label>
              Байгууллагын нэр: *
              <input type="text" name="organization_name" required placeholder="Байгууллагын нэр">
              <span class="validation-error" data-for="organization_name">Байгууллагын нэр оруулна уу</span>
            </label>
            <label>
              Төлөөлөгчийн нэр: *
              <input type="text" name="representative_name" required placeholder="Төлөөлөгчийн нэр">
              <span class="validation-error" data-for="representative_name">Төлөөлөгчийн нэр оруулна уу</span>
            </label>
            <label>
              Хаяг: *
              <input type="text" name="billing_address" required placeholder="Хаяг оруулна уу">
              <span class="validation-error" data-for="billing_address">Хаяг оруулна уу</span>
            </label>
          </div>
        </div>

        <div class="form-section">
          <h3>2. Үйл ажиллагааны мэдээлэл</h3>
          <div class="form-grid">
            <label>
              Үйл ажиллагааны төрөл: *
              <select name="eventType" required>
                <option value="">Сонгох</option>
                <option value="concert">Тоглолт</option>
                <option value="private">Хувийн арга хэмжээ</option>
                <option value="corporate">Байгууллагын өдөрлөг</option>
                <option value="festival">Баяр наадам</option>
                <option value="other">Бусад</option>
              </select>
              <span class="validation-error" data-for="eventType">Үйл ажиллагааны төрлөө сонгоно уу</span>
            </label>
            <label>
              Үйл ажиллагааны огноо: *
              <input type="datetime-local" name="eventDate" required>
              <span class="validation-error" data-for="eventDate">Огноо сонгоно уу</span>
            </label>
            <label>
              Үйл ажиллагааны байршил: *
              <input type="text" name="location" required placeholder="Хот, дүүрэг, тодорхой хаяг">
              <span class="validation-error" data-for="location">Байршлаа оруулна уу</span>
            </label>
            <label for="artistAvailability">Хэрэгтэй хугцаа: *</label>
            <input type="text" name="artistAvailability" id="artistAvailability" required pattern="(\d+(\.\d+)?)\s?(hour|hours|minute|minutes)" placeholder="жишээ: 1 цаг, 30 минут">
            <span class="validation-error" data-for="artistAvailability">Буруу формат, жишээ: 1 цаг, 30 минут</span>

              Үнийн дүн: *
              <input type="number" name="totalAmount" required placeholder="Үнийн дүн">
              <span class="validation-error" data-for="totalAmount">Үнийн дүн оруулна уу MNT</span>
            </label>
          </div>
        </div>

        <div class="form-section">
          <h3>3. Тусгай хүсэлт</h3>
          <div class="form-grid">
            <label>
              Тусгай хүсэлт:
              <textarea name="specialRequests" placeholder="Жишээ: тайз, гэрэлтүүлэг"></textarea>
            </label>
          </div>
        </div>

        <button type="submit" class="submit-button">Захиалга илгээх</button>
      </form>
    </div>
      </main>
    `;
  }
}