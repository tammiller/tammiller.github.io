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

// Simple event loading functions for the refactored event system
async function loadEvents() {
    try {
        const response = await fetch('events.json');
        const events = await response.json();
        return events;
    } catch (error) {
        console.error('Failed to load events:', error);
        return [];
    }
}

async function getLatestEvents() {
    try {
        const events = await loadEvents();
        // Sort events by startDate (newest first) and return the 3 most recent
        const sortedEvents = events.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        const latestThree = sortedEvents.slice(0, 3);
        
        // Reverse the order for display: oldest on left, newest on right
        return latestThree.reverse();
    } catch (error) {
        console.error('Failed to get latest events:', error);
        return [];
    }
}

function generateEventHTML(events) {
    if (!events || events.length === 0) {
        return `
            <div class="col-12 text-center">
                <p>Events werden geladen... Bei Problemen kontaktiere uns unter contact [at] ladybugs-aachen.de</p>
            </div>
        `;
    }

    return events.map(event => {
        const startDate = new Date(event.startDate);
        const endDate = new Date(event.endDate);
        
        const formattedDate = startDate.toLocaleDateString("de-DE", {
            weekday: "short",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
        
        const formattedTime = `${startDate.toLocaleTimeString("de-DE", {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        })} - ${endDate.toLocaleTimeString("de-DE", {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        })}`;
        
        const locationName = event.location?.name || 'Ort nicht verfügbar';
        const hasRegistrationUrl = event.url && event.url.trim() !== '';
        const registrationUrl = hasRegistrationUrl ? event.url : '#';
        const buttonClass = hasRegistrationUrl ? 'btn btn-primary event-button' : 'btn btn-primary event-button disabled';
        const buttonAttributes = hasRegistrationUrl ? 'target="_blank"' : 'aria-disabled="true"';
        
        return `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm border-light">
                    <div class="card-body">
                        <h5 class="card-title">${event.name}</h5>
                        <div class="event-date mb-3">
                            <span class="badge bg-primary">${formattedDate}</span>
                        </div>
                        <p class="card-text">${event.description}</p>
                        <p><strong>Uhrzeit:</strong> ${formattedTime}</p>
                        <p><strong>Location:</strong> ${locationName}</p>
                        <a href="${registrationUrl}" ${buttonAttributes} class="${buttonClass}">Anmeldung</a>
                        <p class="event-keywords">${event.keywords}</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function generateStructuredData(events) {
    if (!events || events.length === 0) return '';
    
    const structuredEvents = events.map(event => ({
        "@type": "Event",
        "name": event.name,
        "description": event.description,
        "startDate": event.startDate,
        "endDate": event.endDate,
        "url": event.url || "",
        "keywords": event.keywords,
        "eventStatus": "https://schema.org/EventScheduled",
        "location": {
            "@type": "Place",
            "name": event.location?.name || "TBA",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": event.location?.address || "TBA"
            }
        },
        "organizer": {
            "@type": "Organization",
            "name": "Ladybugs Aachen",
            "url": "https://www.linkedin.com/company/ladybugs-aachen/"
        }
    }));

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "EventSeries",
        "name": "Ladybugs Aachen Events",
        "description": "Regular meetups and workshops for women in software engineering in Aachen",
        "url": "https://ladybugs-aachen.de",
        "organizer": {
            "@type": "Organization",
            "name": "Ladybugs Aachen",
            "url": "https://ladybugs-aachen.de"
        },
        "event": structuredEvents
    };

    return JSON.stringify(jsonLd, null, 2);
}

async function loadAndDisplayEvents() {
    const events = await getLatestEvents();
    const eventsContainer = document.getElementById('eventsContainer');
    if (eventsContainer) {
        eventsContainer.innerHTML = generateEventHTML(events);
    }
    
    // Generate and inject structured data
    const structuredData = generateStructuredData(events);
    if (structuredData) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = structuredData;
        document.head.appendChild(script);
    }
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

    // Load and display events
    loadAndDisplayEvents();
});