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
            loginButton.textContent = 'Уншиж байна...'; // "Logging in..."
            errorMessage.textContent = '';

            try {
                const response = await fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ u: username, p: password })
                });
                
                const artistData = await response.json();
                
                if (response.ok && data) {
                    // Store auth data
                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('userData', JSON.stringify({
                        username: username,
                        profileImage: data.profileImage || './picture/default-profile.jpg' // Use actual profile image from response
                    }));
                    window.location.href = './profile.html'; // Redirect after successful login
                } else {
                    errorMessage.textContent = data.message || 'Дахиад шалгаад хүсэлт явуулна уу.'; // "Please check and try again."
                }
            } catch (error) {
                console.error('Нэвтрэх үед алдаа гарлаа:', error); // "Error during login"
                errorMessage.textContent = 'Сүлжээний алдаа'; // "Network error"
            } finally {
                loginButton.disabled = false;
                loginButton.textContent = 'Нэвтрэх'; // "Login"
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', initializeLoginForm);
