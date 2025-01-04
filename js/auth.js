// auth.js
function checkAuthState() {
    // Check if user is logged in by looking for auth token
    const isLoggedIn = localStorage.getItem('authToken') !== null;
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    return { isLoggedIn, userData };
}

function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    window.location.href = './login.html';
}

// Only initialize login form if we're on the login page
function initializeLoginForm() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            const loginButton = document.getElementById('login-button');
            const errorMessage = document.getElementById('error-message');
            loginButton.disabled = true;
            loginButton.textContent = 'Уншиж байна...';
            errorMessage.textContent = '';

            try {
                const response = await fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ u: username, p: password })
                });
                
                const data = await response.json();
                
                if (response.ok && data) {
                    // Store auth data
                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('userData', JSON.stringify({
                        username: username,
                        profileImage: './picture/thunder.jfif' // Update this with actual user image
                    }));
                    window.location.href = './profile.html';
                } else {
                    errorMessage.textContent = data.message || 'Дахиад шалгаад хүсэлт явуулна уу.';
                }
            } catch (error) {
                console.error('нэвтрэх үед:', error);
                errorMessage.textContent = 'Сүлжээний алдаа';
            } finally {
                loginButton.disabled = false;
                loginButton.textContent = 'Нэвтрэх';
            }
        });
    }
}

// Initialize form when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeLoginForm);