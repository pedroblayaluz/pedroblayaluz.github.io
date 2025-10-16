document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('menu-toggle');
    const menu = document.getElementById('top-menu');
    const topbar = document.querySelector('.topbar');
    const sectionToggles = document.querySelectorAll('.section-toggle');

    // Toggle menu by clicking anywhere on the topbar (including burger/title)
    topbar.addEventListener('click', function() {
        burger.classList.toggle('active');
        menu.classList.toggle('open');
    });

    // Toggle subsections
    sectionToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const subsection = this.nextElementSibling;
            if (subsection) {
                subsection.classList.toggle('active');
            }
        });
    });
});

// Redirect rule: if the current path is under /pages/arte/lps or /pages/lps, send to musica
(function(){
    try {
        var p = location.pathname.replace(/\/+/g, '/');
        if (/^\/pages(?:\/arte)?\/lps(?:$|\/)/i.test(p)) {
            var target = '/pages/arte/musica.html';
            if (p !== target) location.replace(target);
        }
    } catch (e) {
        // no-op
    }
})();
