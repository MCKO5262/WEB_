document.addEventListener('DOMContentLoaded', async function () {
    const artist_id = localStorage.getItem('artist_id');
    if (!artist_id) {
        return;
    }
    
    try {
        const response = await fetch(`http://localhost:3000/api/artists/${artist_id}`);
        if (!response.ok) throw new Error('Failed to load artist data');
        
        const { data: artistData } = await response.json();
        
        // Мэдээллийг дэлгэцлэх
        document.getElementById('artist_id').textContent = artistData.artist_name;
        document.getElementById('artist_images').src = artistData.artist_image || './picture/default-profile.png';
        document.getElementById('artist_description').textContent = artistData.artist_description;
        
        // Үндсэн үйлчилгээний мэдээлэл
        document.getElementById('artist_category').textContent = artistData.artist_category;

        // Tab сонголтын удирдлага
        const buttons = document.querySelectorAll('.optionuud button');
        const articles = document.querySelectorAll('#Medeelel article');
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                // Идэвхтэй tab-ийг цэвэрлэх
                buttons.forEach(b => b.classList.remove('active'));
                articles.forEach(a => a.classList.remove('active'));
                
                // Шинэ tab идэвхжүүлэх
                const tab = this.getAttribute('data-tab');
                this.classList.add('active');
                document.getElementById(tab)?.classList.add('active');
            });
        });
    } catch (error) {
        console.error('Error:', error);
    }
});