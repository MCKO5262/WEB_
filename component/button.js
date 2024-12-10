class ProfileButtonsHandler extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // Bind event listeners for all interactive elements
        this.setupServiceSaveHandler();
        this.setupMediaAddHandlers();
        this.setupAudioControlHandlers();
    }

    setupServiceSaveHandler() {
        const mainServiceSelect = document.getElementById('main-service');
        const extraServiceSelect = document.getElementById('extra-service');
        const saveButtons = document.querySelectorAll('.save-button');

        saveButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Prevent default form submission
                e.preventDefault();

                if (button.closest('#basic')) {
                    // Service save logic
                    const mainService = mainServiceSelect.value;
                    const extraService = extraServiceSelect.value;

                    // Simulate server save
                    this.showTemporaryFeedback(button, 'Амжилттай хадгалагдлаа!');

                    // Optional: You could send data to a backend here
                    console.log('Services saved:', { mainService, extraService });
                } else if (button.closest('#info')) {
                    // Info save logic
                    this.showTemporaryFeedback(button, 'Танилцуулга шинэчлэгдлээ!');
                }
            });
        });
    }

    setupMediaAddHandlers() {
        const photoAddButton = document.querySelector('#photos .save-button');
        const videoAddButton = document.querySelector('#video .save-button');

        photoAddButton?.addEventListener('click', (e) => {
            e.preventDefault();
            this.openMediaUploader('photo');
        });

        videoAddButton?.addEventListener('click', (e) => {
            e.preventDefault();
            this.openMediaUploader('video');
        });
    }

    setupAudioControlHandlers() {
        const audioControls = document.querySelectorAll('.audio-control');
        const audioAddButton = document.querySelector('#audio .save-button');

        audioControls.forEach(control => {
            control.addEventListener('click', (e) => {
                // Toggle play/pause
                const isPlaying = control.textContent === '❚❚';
                control.textContent = isPlaying ? '▶' : '❚❚';
                
                // In a real app, you'd control actual audio playback here
                console.log(isPlaying ? 'Paused' : 'Playing');
            });
        });

        audioAddButton?.addEventListener('click', (e) => {
            e.preventDefault();
            this.openMediaUploader('audio');
        });
    }

    showTemporaryFeedback(button, message) {
        const originalText = button.textContent;
        button.textContent = message;
        button.disabled = true;

        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    }

    openMediaUploader(type) {
        // Simulate media upload dialog
        alert(`Нэмэх ${type.toUpperCase()} сонгох цонх нээгдэв`);
        
        // In a real application, this would open a file picker 
        // or trigger a more sophisticated upload mechanism
    }
}

// Register the custom element
customElements.define('profile-buttons-handler', ProfileButtonsHandler);

// Add the handler to the page
document.addEventListener('DOMContentLoaded', () => {
    const handler = document.createElement('profile-buttons-handler');
    document.body.appendChild(handler);
});