/**
 * Simple Hash-based Router
 * Handles navigation between virtual pages within the single HTML file.
 * Updated to explicitly handle visibility to prevent "stacking" issues.
 */
function navigate() {
    // Get the current hash (e.g., #research) or default to #home
    const hash = window.location.hash || '#home';
    
    const sections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let found = false;

    // Toggle Section Visibility
    sections.forEach(section => {
        const sectionId = '#' + section.id;
        if (sectionId === hash) {
            // Force display to block so it's visible
            section.style.display = 'block';
            // Use a slight timeout to allow the display change to register before starting the fade-in animation
            setTimeout(() => {
                section.classList.add('active');
            }, 10);
            found = true;
        } else {
            // Hide the section and remove the animation class
            section.classList.remove('active');
            section.style.display = 'none';
        }
    });

    // Fallback logic if user enters an invalid URL hash
    if (!found) {
        window.location.hash = '#home';
        return;
    }

    // Update Navigation UI
    navLinks.forEach(link => {
        if (link.getAttribute('href') === hash) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Ensure the view starts at the top of the "new" page
    window.scrollTo(0, 0);
}

/**
 * Mobile Menu Toggle
 */
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Event Listeners
// Use DOMContentLoaded instead of load for a faster response
window.addEventListener('DOMContentLoaded', navigate);
window.addEventListener('hashchange', navigate);

// Close mobile menu when a link is clicked
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        const menu = document.getElementById('mobile-menu');
        if (menu) menu.classList.add('hidden');
    });
});