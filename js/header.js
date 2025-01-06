/**
 * Хэрэглэгчийн нэвтрэх төлөвийг шалгаж, толгой хэсгийн UI-г динамикаар өөрчилдөг функц
 */
function initializeHeader() {
    // Хэрэглэгчийн нэвтрэх төлөв болон мэдээллийг авах
    const { isLoggedIn, userData } = checkAuthState();
    // Толгой хэсгийн навигацийн жагсаалтыг DOM-оос олох 
    const headerNav = document.querySelector('header nav ul');
    // "Нэвтрэх" товчтой жагсаалтын элементийг олох
    const loginLi = headerNav.querySelector('.login');
    
    // Хэрэв хэрэглэгч нэвтэрсэн бол
    if (isLoggedIn) {
        // Хэрэв "Нэвтрэх" товч байвал устгах
        if (loginLi) {
            loginLi.remove();
        }
        // Хэрэв хэрэглэгчийн dropdown menu байхгүй бол нэмэх
        if (!headerNav.querySelector('.loged')) {
            // Хэрэглэгчийн хэсгийн HTML бүтэц
            const userSection = `
                <li class="loged">
                    <div class="tovch">
                        <img src="${userData.profileImage}" alt="user">
                        <span class="ner"></span>
                        <span class="ner">Thunder</span>
                        <svg width="180" height="180" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <!-- Дөрвөлжин дүрс -->
                        <!-- Rectangle shape -->
                        <rect x="10" y="10" width="80" height="80" rx="15" ry="15" fill="#e6e6e6"/>
                        <!-- Доошоо заасан сум -->
                        <!-- Downward pointing arrow -->
                        <path d="M30 40 L50 60 L70 40" stroke="#000" stroke-width="8" fill="none" stroke-linecap="round" />
                        </svg>
                    </div>
                    <div class="songolt">
                        <a href="#" onclick="logout(); return false;">Гарах</a>
                        <a href="profile.html">Тохиргоо</a>
                    </div>
                </li>`;
            
            // Хэрэглэгчийн хэсгийг навигацийн төгсгөлд нэмэх
            headerNav.insertAdjacentHTML('beforeend', userSection);
        }
    } else {
        // Хэрэглэгч нэвтрээгүй бол dropdown-ыг устгах
        const dropdown = headerNav.querySelector('.loged');
        if (dropdown) {
            dropdown.remove();
        }
        // Хэрэв "Нэвтрэх" товч байхгүй бол нэмэх
        if (!loginLi) {
            const loginButton = `<li class="login"><a href="login.html">Нэвтрэх</a></li>`;
            headerNav.insertAdjacentHTML('beforeend', loginButton);
        }
    }
}
// DOM бүрэн ачаалагдсаны дараа функцийг ажиллуулах
document.addEventListener('DOMContentLoaded', initializeHeader);