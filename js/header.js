// header.js
function initializeHeader() {
    const { isLoggedIn, userData } = checkAuthState();
    const headerNav = document.querySelector('header nav ul');
    
    // Find the login list item
    const loginLi = headerNav.querySelector('.login');
    
    if (isLoggedIn) {
        // Remove login button if it exists
        if (loginLi) {
            loginLi.remove();
        }
        
        // Add user dropdown if it doesn't exist
        if (!headerNav.querySelector('.dropdown')) {
            const userSection = `
                <li class="dropdown">
                    <div class="dropdown-toggle">
                        <img src="${userData.profileImage}" alt="user">
                        <span class="username"></span>
                        <span class="username">Thunder</span>
                        <svg width="180" height="180" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <!-- дөрвөлжин -->
                        <rect x="10" y="10" width="80" height="80" rx="15" ry="15" fill="#e6e6e6"/>
                        <!-- Доошоо сум -->
                        <path d="M30 40 L50 60 L70 40" stroke="#000" stroke-width="8" fill="none" stroke-linecap="round" />
                        </svg>
                    </div>
                    <div class="dropdown-content">
                        <a href="#" onclick="logout(); return false;">Гарах</a>
                        <a href="profile.html">Тохиргоо</a>
                    </div>
                </li>`;
            headerNav.insertAdjacentHTML('beforeend', userSection);
        }
    } else {
        // Remove dropdown if it exists
        const dropdown = headerNav.querySelector('.dropdown');
        if (dropdown) {
            dropdown.remove();
        }
        
        // Add login button if it doesn't exist
        if (!loginLi) {
            const loginButton = `<li class="login"><a href="login.html">Нэвтрэх</a></li>`;
            headerNav.insertAdjacentHTML('beforeend', loginButton);
        }
    }
}

// Initialize header when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeHeader);