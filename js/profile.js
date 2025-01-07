document.addEventListener('DOMContentLoaded', async function () {
    const artist_id = localStorage.getItem('artist_id');
    if (!artist_id) {
        requestAnimationFrame(() => {
            window.location.replace('login.html');
        });
        return;
    }

    const categoryMapping = {
        'singer': 'Дуучин',
        'band': 'Хамтлаг', 
        'musician': 'Хөгжимчин',
        'host': 'Хөтлөгч',
        'comedian': 'Комедиан',
        'dancer': 'Бүжигчин'
    };

    try {
        const response = await fetch(`http://localhost:3000/api/artists/${artist_id}`);
        if (!response.ok) throw new Error('Failed to load artist data');

        const { data: artistData } = await response.json();

        // Populate profile data
        document.getElementById('artist_id').textContent = artistData.artist_name;
        document.getElementById('artist_images').src = artistData.artist_image || './picture/default-profile.png';
        document.getElementById('artist_description').textContent = artistData.artist_description;
        
        // Set category and price
        document.getElementById('artist_category').value = categoryMapping[artistData.artist_category] || artistData.artist_category;
        document.getElementById('Nemelt').value = artistData.artist_price 
            ? `${artistData.artist_price.toLocaleString()}₮` 
            : 'Байхгүй';

        // Setup tab switching
        const buttons = document.querySelectorAll('.optionuud button');
        const articles = document.querySelectorAll('#Medeelel article');

        buttons.forEach(button => {
            button.addEventListener('click', function() {
                buttons.forEach(b => b.classList.remove('active'));
                articles.forEach(a => a.classList.remove('active'));
                
                const tab = this.getAttribute('data-tab');
                this.classList.add('active');
                document.getElementById(tab)?.classList.add('active');
            });
        });

    } catch (error) {
        console.error('Error:', error);
    }
});