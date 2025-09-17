// Universal image popup/modal logic
// Usage: add .image-thumb to clickable images, .image-thumbs to the container
// Add the modal HTML to your page (see below)

document.addEventListener('DOMContentLoaded', () => {
    // Create modal if not present
    if (!document.getElementById('image-popup-modal')) {
        const modal = document.createElement('div');
        modal.id = 'image-popup-modal';
        modal.className = 'image-popup-modal';
        modal.innerHTML = `
            <span class="image-popup-close">&times;</span>
            <img id="image-popup-img" src="" alt="Imagem em tamanho completo">
        `;
        document.body.appendChild(modal);
    }
    const modal = document.getElementById('image-popup-modal');
    const modalImg = document.getElementById('image-popup-img');
    const closeBtn = modal.querySelector('.image-popup-close');

    // Delegate click for all .image-thumb
    document.body.addEventListener('click', function(e) {
        const target = e.target;
        if (target.classList.contains('image-thumb')) {
            modalImg.src = target.src;
            modalImg.alt = target.alt || '';
            modal.style.display = 'block';
        }
    });

    // Close modal on close button
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        modal.style.display = 'none';
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
});
