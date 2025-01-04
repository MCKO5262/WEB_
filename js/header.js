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
                        <span class="username">${userData.username}</span>
                        <p>🔽</p>
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