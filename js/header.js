document.addEventListener('DOMContentLoaded', async function () {
    const artist_id = localStorage.getItem('artist_id');
    let artistData = null;

    try {
        const response = await fetch(`http://localhost:3000/api/artists/${artist_id}`);
        if (!response.ok) throw new Error('Failed to load artist data');

        const { data } = await response.json();
        artistData = data; // Store the artist data
    } catch (error) {
        console.error('Error loading artist data:', error);
    }

    // Check the authentication state
    const { isLoggedIn, userData } = checkAuthState();
    
    // Initialize header based on authentication state
    initializeHeader(artistData, isLoggedIn, userData);
});

function initializeHeader(artistData, isLoggedIn, userData) {
    const headerNav = document.querySelector('header nav ul');
    
    // Find the login list item and user section
    const loginLi = headerNav.querySelector('.login');
    const loggedSection = headerNav.querySelector('.loged');

    if (isLoggedIn) {
        if (loginLi) {
            loginLi.remove();
        }
        
        // If user dropdown doesn't exist, add it
        if (!loggedSection) {
            const userSection = `
                <li class="loged">
                    <div class="tovch">
                        <img id="artist_image" src="${artistData.artist_image}" alt="user">
                        <span id="user_name">${artistData.artist_name}</span>
                        <svg width="180" height="180" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <rect x="10" y="10" width="80" height="80" rx="15" ry="15" fill="#e6e6e6"/>
                            <path d="M30 40 L50 60 L70 40" stroke="#000" stroke-width="8" fill="none" stroke-linecap="round" />
                        </svg>
                    </div>
                    <div class="songolt">
                        <a href="#" onclick="logout(); return false;">Гарах</a>
                        <a href="profile.html">Тохиргоо</a>
                    </div>
                </li>`;
            
            // Add user section to the end of navigation
            headerNav.insertAdjacentHTML('beforeend', userSection);
        }
    } else {
        if (loggedSection) {
            loggedSection.remove();
        }
        
        if (!loginLi) {
            const loginButton = `<li class="login"><a href="login.html">Login</a></li>`;
            headerNav.insertAdjacentHTML('beforeend', loginButton);
        }
    }
}

// Function to check authentication state
function checkAuthState() {
    const isLoggedIn = localStorage.getItem('authToken') !== null;
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    return { isLoggedIn, userData };
}

function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    window.location.href = './login.html';
}
