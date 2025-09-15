document.addEventListener('DOMContentLoaded', function() {
    const sectionToggles = document.querySelectorAll('.section-toggle');
    const sidebarHeader = document.querySelector('.sidebar-header');
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const container = document.querySelector('.container');
    
    // Helper function to check if mobile view
    function isMobileView() {
        return window.innerWidth <= 768;
    }

    // Toggle subsections
    sectionToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const subsection = this.nextElementSibling;
            subsection.classList.toggle('active');
        });
    });

    // Toggle sidebar on desktop
    sidebarToggle.addEventListener('click', function() {
        if (!isMobileView()) {
            container.classList.toggle('sidebar-collapsed');
            this.classList.toggle('active');
        }
    });

    // Mobile menu toggle
    sidebarHeader.addEventListener('click', function() {
        if (isMobileView()) {
            sidebar.classList.toggle('active');
        }
    });
    
    // Handle resize events
    window.addEventListener('resize', function() {
        if (isMobileView()) {
            container.classList.remove('sidebar-collapsed');
            sidebarToggle.classList.remove('active');
        } else {
            sidebar.classList.remove('active');
        }
    });
});
