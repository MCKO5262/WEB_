// dark mode-ийн төлөвийг localStorage-оос унших
let darkmode = localStorage.getItem('darkmode');

// "theme-switch" ID-тэй элементийг авах
const themeSwitch = document.getElementById('theme-switch');

// dark mode-г идэвхжүүлэх функц
const enableDarkmode = () => {
    document.body.classList.add('darkmode'); // 'darkmode' ангийн CSS-ийг body дээр нэмэх
    localStorage.setItem('darkmode', 'active'); // localStorage-д dark mode-г 'active' гэж хадгалах
};

// dark mode-г идэвхгүй болгох функц
const disableDarkmode = () => {
    document.body.classList.remove('darkmode'); // 'darkmode' ангийн CSS-ийг body-оос хасах
    localStorage.setItem('darkmode', null); // localStorage-д dark mode-ийн утгыг null гэж хадгалах
};

// Хадгалагдсан төлөвийг шалгаж, dark mode идэвхтэй бол идэвхжүүлэх
if (darkmode === "active") enableDarkmode();

// Товчлуур дээр дарахад dark mode-г сольж өөрчлөх
themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode'); // Одоогийн dark mode-ийн төлөвийг дахин шалгах
    darkmode !== "active" ? enableDarkmode() : disableDarkmode(); // dark mode-г асаах эсвэл унтраах
});
