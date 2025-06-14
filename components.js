// Navbar component
function createNavbar() {
    return `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">
                <img src="images/favicon-32x32.png" alt="Logo" width="30" height="30" class="d-inline-block align-text-top">
                Ladybugs Aachen
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-link" href="/#home">Home</a>
                    <a class="nav-link" href="/#about">Über uns</a>
                    <a class="nav-link" href="/#events">Veranstaltungen</a>
                    <a class="nav-link" href="/#callforaction">Call for Speakers</a>
                    <a class="nav-link" href="/impressum">Impressum</a>
                </div>
            </div>
        </div>
    </nav>`;
}

// Footer component
function createFooter() {
    return `
    <footer class="footer mt-auto py-3 bg-light">
        <div class="container">
            <span class="text-muted">Softwareentwicklerinnentreff Ladybug Aachen. A community for women in software engineering in Aachen,
                Germany</span>
        </div>
    </footer>`;
}

// Cookie banner component
function createCookieBanner() {
    return `
    <div id="cookie-banner" class="alert alert-light mb-0">
        <span>Wir speichern keine Cookies :D  <a href="/impressum" class="alert-link">Weitere Informationen</a>.</span>
        <button id="accept-btn" class="btn btn-primary">OK</button>
    </div>`;
}

// Initialize components
document.addEventListener('DOMContentLoaded', function() {
    // Insert navbar
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = createNavbar();
    }

    // Insert footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = createFooter();
    }

    // Insert cookie banner
    const cookieBannerContainer = document.getElementById('cookie-banner-container');
    if (cookieBannerContainer) {
        cookieBannerContainer.innerHTML = createCookieBanner();
        
        // Initialize cookie banner functionality
        const banner = document.getElementById('cookie-banner');
        const acceptBtn = document.getElementById('accept-btn');
        if (banner && acceptBtn) {
            acceptBtn.addEventListener('click', function() {
                banner.style.display = 'none';
            });
        }
    }

    // Set active nav link based on current page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (currentPath === '/' && link.getAttribute('href') === '/#home') {
            link.classList.add('active');
        } else if (currentPath === '/impressum' && link.getAttribute('href') === '/impressum') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}); 