let darkmode = localStorage.getItem('darkmode');

const themeSwitch = document.getElementById('theme-switch');
const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active'); 
};
const disableDarkmode = () => {
    document.body.classList.remove('darkmode'); 
    localStorage.setItem('darkmode', null); 
};
if (darkmode === "active") enableDarkmode();

themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode'); // Одоогийн dark mode-ийн төлөвийг дахин шалгах
    darkmode !== "active" ? enableDarkmode() : disableDarkmode(); // dark mode-г асаах эсвэл унтраах
});
