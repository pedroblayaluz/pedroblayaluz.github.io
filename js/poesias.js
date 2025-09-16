document.addEventListener('DOMContentLoaded', () => {
    const poesiasGrid = document.getElementById('poesias-grid');
    const popup = document.getElementById('image-popup');
    const popupImg = document.getElementById('popup-image');
    const closeBtn = document.querySelector('.close-popup');

    // List of all poem images
    const poesias = [
        '4212.png',
        'a vida.png',
        'afinando.png',
        'amor_outro.png',
        'apaz2.png',
        'arvores.jpg',
        'comoloca.png',
        'droga.png',
        'escatologicos.jpg',
        'estranho.png',
        'et.png',
        'eu.png',
        'gif.gif',
        'incrivel.png',
        'jerusalem.png',
        'letras.png',
        'love.png',
        'mundo.png',
        'nada-tudo.png',
        'poeira estelar.png',
        'poesiabraco.png',
        'por-que2.png',
        'pressa.png',
        'riso.jpg'
    ];

    // Create poem elements
    poesias.forEach(poesia => {
        const poesiaItem = document.createElement('div');
        poesiaItem.className = 'poesia-item';
        
        const img = document.createElement('img');
        img.src = `assets/images/poesias/${poesia}`;
        img.alt = poesia.replace('.png', '').replace('.jpg', '').replace('.gif', '');
        
        poesiaItem.appendChild(img);
        poesiasGrid.appendChild(poesiaItem);

        // Add click event for popup
        poesiaItem.addEventListener('click', () => {
            popupImg.src = img.src;
            popupImg.alt = img.alt;
            popup.style.display = 'block';
        });
    });

    // Close popup when clicking X button
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        popup.style.display = 'none';
    });

    // Close popup when clicking outside the image
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });

    // Close popup when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.style.display === 'block') {
            popup.style.display = 'none';
        }
    });
});