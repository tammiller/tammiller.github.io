// Navbar component
function createNavbar() {
    return `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">
                <img src="images/favicon-32x32.png" alt="Ladybugs Aachen Logo - Women in Tech Community Aachen" width="30" height="30" class="d-inline-block align-text-top" loading="lazy">
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
    <footer class="footer mt-auto py-4 bg-light">
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <p class="text-muted mb-2">Softwareentwicklerinnentreff Ladybug Aachen. A community for women in software engineering</p>
                    <p class="text-muted mb-0">
                        <strong>Location:</strong> Aachen, Nordrhein-Westfalen, Deutschland
                    </p>
                </div>
                <div class="col-md-4 text-md-end">
                    <h6>Follow Us</h6>
                    <a href="https://www.linkedin.com/company/ladybugs-aachen/" target="_blank" rel="noopener" class="text-decoration-none me-3">
                        <i class="fab fa-linkedin"></i> LinkedIn
                    </a>
                    <br>
                </div>
            </div>
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
        "url": event.url || "https://ladybugs-aachen.de/#events",
        "keywords": event.keywords,
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "category": "Technology",
        "audience": {
            "@type": "Audience",
            "audienceType": "Women in Technology, Software Developers"
        },
        "inLanguage": "de-DE",
        "isAccessibleForFree": true,
        "location": {
            "@type": "Place",
            "name": event.location?.name || "Aachen",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": event.location?.address || "Aachen",
                "addressLocality": "Aachen",
                "addressRegion": "Nordrhein-Westfalen",
                "addressCountry": "DE",
                "postalCode": "52062"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 50.7753,
                "longitude": 6.0839
            }
        },
        "organizer": {
            "@type": "Organization",
            "name": "Ladybugs Aachen",
            "url": "https://ladybugs-aachen.de",
            "logo": "https://ladybugs-aachen.de/images/ladybug.jpeg",
            "sameAs": [
                "https://www.linkedin.com/company/ladybugs-aachen/",
                "https://www.meetup.com/ladybugs-aachen/"
            ]
        },
        "performer": {
            "@type": "Organization",
            "name": "Ladybugs Aachen"
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "validFrom": new Date().toISOString()
        }
    }));

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "EventSeries",
        "name": "Ladybugs Aachen Events",
        "alternateName": "Women in Tech Meetups Aachen",
        "description": "Regular meetups and workshops for women in software engineering in Aachen. Tech talks, networking events, hack evenings and professional development opportunities.",
        "url": "https://ladybugs-aachen.de",
        "category": "Technology",
        "audience": {
            "@type": "Audience",
            "audienceType": "Women in Technology, Software Developers, IT Professionals"
        },
        "inLanguage": ["de-DE", "en-US"],
        "location": {
            "@type": "Place",
            "name": "Aachen",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Aachen",
                "addressRegion": "Nordrhein-Westfalen", 
                "addressCountry": "DE"
            }
        },
        "organizer": {
            "@type": "Organization",
            "name": "Ladybugs Aachen",
            "url": "https://ladybugs-aachen.de",
            "logo": "https://ladybugs-aachen.de/images/ladybug.jpeg",
            "description": "Community für Frauen in der Softwareentwicklung",
            "sameAs": [
                "https://www.linkedin.com/company/ladybugs-aachen/",
                "https://www.meetup.com/ladybugs-aachen/"
            ]
        },
        "event": structuredEvents,
        "keywords": "women in tech, software engineering, programming meetup, tech community, Aachen, workshops, networking"
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
    
    // Initialize SEO performance monitoring
    initializeSEOMonitoring();
});

// SEO Performance Monitoring Functions
function initializeSEOMonitoring() {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
        monitorCoreWebVitals();
    }
    
    // Validate structured data on page load
    validateStructuredData();
    
    // Monitor page performance
    monitorPagePerformance();
}

function monitorCoreWebVitals() {
    // This would integrate with Google's web-vitals library if included
    // For now, we'll use basic performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log('Page Load Time:', loadTime + 'ms');
            
            // Log to console for monitoring (in production, this would send to analytics)
            if (loadTime > 3000) {
                console.warn('Page load time exceeds 3 seconds:', loadTime + 'ms');
            }
        });
    }
}

function validateStructuredData() {
    // Check if structured data scripts are present
    const structuredDataScripts = document.querySelectorAll('script[type="application/ld+json"]');
    
    if (structuredDataScripts.length === 0) {
        console.warn('No structured data found on page');
        return false;
    }
    
    let validStructuredData = 0;
    structuredDataScripts.forEach((script, index) => {
        try {
            const data = JSON.parse(script.textContent);
            if (data['@context'] && data['@type']) {
                validStructuredData++;
                console.log(`Valid structured data found (${index + 1}):`, data['@type']);
            }
        } catch (error) {
            console.error(`Invalid structured data in script ${index + 1}:`, error);
        }
    });
    
    console.log(`Total valid structured data blocks: ${validStructuredData}`);
    return validStructuredData > 0;
}

function monitorPagePerformance() {
    // Monitor various performance metrics
    if ('performance' in window && 'getEntriesByType' in performance) {
        window.addEventListener('load', function() {
            // Monitor resource loading
            const resources = performance.getEntriesByType('resource');
            const slowResources = resources.filter(resource => resource.duration > 1000);
            
            if (slowResources.length > 0) {
                console.warn('Slow loading resources detected:', slowResources.map(r => r.name));
            }
            
            // Monitor navigation timing
            const navigation = performance.getEntriesByType('navigation')[0];
            if (navigation) {
                console.log('Navigation Performance:', {
                    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                    loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
                    totalTime: navigation.loadEventEnd - navigation.fetchStart
                });
            }
        });
    }
}

// Comprehensive SEO Testing and Validation Suite
function validateMetaTags() {
    const requiredMetaTags = [
        'description',
        'keywords', 
        'og:title',
        'og:description',
        'og:image',
        'twitter:card',
        'twitter:title',
        'twitter:description'
    ];
    
    const missingTags = [];
    const validationResults = {};
    
    requiredMetaTags.forEach(tag => {
        const metaTag = document.querySelector(`meta[name="${tag}"], meta[property="${tag}"]`);
        if (!metaTag) {
            missingTags.push(tag);
            validationResults[tag] = { present: false, content: null };
        } else {
            const content = metaTag.getAttribute('content');
            validationResults[tag] = { 
                present: true, 
                content: content,
                length: content ? content.length : 0
            };
            
            // Validate content length for specific tags
            if (tag === 'description' && content && content.length > 160) {
                console.warn(`Meta description too long (${content.length} chars):`, content);
            }
            if (tag === 'og:title' && content && content.length > 60) {
                console.warn(`OG title too long (${content.length} chars):`, content);
            }
        }
    });
    
    if (missingTags.length > 0) {
        console.warn('Missing meta tags:', missingTags);
        return { valid: false, missing: missingTags, results: validationResults };
    }
    
    console.log('All required meta tags are present');
    return { valid: true, missing: [], results: validationResults };
}

function validateSocialMediaPreviews() {
    const socialTests = {
        openGraph: {
            required: ['og:title', 'og:description', 'og:image', 'og:url', 'og:type'],
            optional: ['og:site_name', 'og:locale']
        },
        twitter: {
            required: ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'],
            optional: ['twitter:site', 'twitter:creator']
        }
    };
    
    const results = {};
    
    Object.keys(socialTests).forEach(platform => {
        results[platform] = { valid: true, missing: [], present: [] };
        
        socialTests[platform].required.forEach(tag => {
            const metaTag = document.querySelector(`meta[property="${tag}"], meta[name="${tag}"]`);
            if (!metaTag) {
                results[platform].missing.push(tag);
                results[platform].valid = false;
            } else {
                results[platform].present.push(tag);
            }
        });
    });
    
    console.log('Social Media Preview Validation:', results);
    return results;
}

function validateImageOptimization() {
    const images = document.querySelectorAll('img');
    const imageValidation = [];
    
    images.forEach((img, index) => {
        const validation = {
            src: img.src,
            alt: img.alt,
            hasAlt: !!img.alt,
            hasTitle: !!img.title,
            hasWidth: !!img.width,
            hasHeight: !!img.height,
            isOptimized: false
        };
        
        // Check if alt text is descriptive (more than just filename)
        if (validation.alt) {
            const filename = img.src.split('/').pop().split('.')[0];
            validation.isDescriptiveAlt = !validation.alt.toLowerCase().includes(filename.toLowerCase());
        }
        
        // Check for SEO-friendly alt text keywords
        if (validation.alt) {
            const seoKeywords = ['women', 'tech', 'aachen', 'software', 'developer', 'community', 'meetup'];
            validation.hasSEOKeywords = seoKeywords.some(keyword => 
                validation.alt.toLowerCase().includes(keyword)
            );
        }
        
        imageValidation.push(validation);
        
        if (!validation.hasAlt) {
            console.warn(`Image missing alt text:`, img.src);
        }
    });
    
    console.log('Image Optimization Validation:', imageValidation);
    return imageValidation;
}

function validateMobileResponsiveness() {
    const viewport = document.querySelector('meta[name="viewport"]');
    const hasViewport = !!viewport;
    
    const responsiveTests = {
        hasViewportMeta: hasViewport,
        viewportContent: hasViewport ? viewport.getAttribute('content') : null,
        hasBootstrap: !!document.querySelector('link[href*="bootstrap"]'),
        hasResponsiveImages: document.querySelectorAll('img.img-fluid, img.img-responsive').length > 0,
        hasResponsiveContainers: document.querySelectorAll('.container, .container-fluid').length > 0
    };
    
    console.log('Mobile Responsiveness Validation:', responsiveTests);
    return responsiveTests;
}

function runComprehensiveSEOTest() {
    console.log('🔍 Running Comprehensive SEO Validation Suite...');
    
    const results = {
        metaTags: validateMetaTags(),
        socialMedia: validateSocialMediaPreviews(),
        structuredData: validateStructuredData(),
        images: validateImageOptimization(),
        mobile: validateMobileResponsiveness(),
        performance: {
            loadTime: null,
            resourceCount: 0
        }
    };
    
    // Performance check
    if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
            results.performance.loadTime = navigation.loadEventEnd - navigation.fetchStart;
        }
        results.performance.resourceCount = performance.getEntriesByType('resource').length;
    }
    
    // Generate SEO score
    let score = 0;
    let maxScore = 0;
    
    // Meta tags (25 points)
    maxScore += 25;
    if (results.metaTags.valid) score += 25;
    
    // Social media (20 points)
    maxScore += 20;
    if (results.socialMedia.openGraph.valid && results.socialMedia.twitter.valid) score += 20;
    else if (results.socialMedia.openGraph.valid || results.socialMedia.twitter.valid) score += 10;
    
    // Structured data (20 points)
    maxScore += 20;
    if (results.structuredData) score += 20;
    
    // Images (15 points)
    maxScore += 15;
    const imagesWithAlt = results.images.filter(img => img.hasAlt).length;
    const totalImages = results.images.length;
    if (totalImages > 0) {
        score += Math.round((imagesWithAlt / totalImages) * 15);
    }
    
    // Mobile (10 points)
    maxScore += 10;
    if (results.mobile.hasViewportMeta && results.mobile.hasResponsiveContainers) score += 10;
    
    // Performance (10 points)
    maxScore += 10;
    if (results.performance.loadTime && results.performance.loadTime < 3000) score += 10;
    else if (results.performance.loadTime && results.performance.loadTime < 5000) score += 5;
    
    const seoScore = Math.round((score / maxScore) * 100);
    
    console.log(`📊 SEO Score: ${seoScore}/100`);
    console.log('📋 Full SEO Validation Results:', results);
    
    return { score: seoScore, maxScore, results };
}

// Auto-run SEO validation in development mode
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('load', function() {
        setTimeout(runComprehensiveSEOTest, 2000);
    });
}

// Image Optimization Functions
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading="lazy" to images below the fold if not already present
        if (!img.hasAttribute('loading') && !isImageAboveFold(img)) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Add error handling for broken images
        img.addEventListener('error', function() {
            console.warn('Failed to load image:', this.src);
            // Could add fallback image here
            this.alt = this.alt + ' (Image not available)';
        });
        
        // Add load event for performance monitoring
        img.addEventListener('load', function() {
            console.log('Image loaded successfully:', this.src);
        });
    });
}

function isImageAboveFold(img) {
    const rect = img.getBoundingClientRect();
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return rect.top < viewHeight;
}

function createImageFallbacks() {
    // Create fallback for social media sharing if main image fails
    const socialImages = [
        'https://ladybugs-aachen.de/images/ladybug.jpeg',
        'https://ladybugs-aachen.de/images/hackevening.jpeg',
        'https://ladybugs-aachen.de/images/workshop.jpeg'
    ];
    
    // Test image availability
    socialImages.forEach(imageUrl => {
        const img = new Image();
        img.onload = function() {
            console.log('Social media image available:', imageUrl);
        };
        img.onerror = function() {
            console.warn('Social media image not available:', imageUrl);
        };
        img.src = imageUrl;
    });
}

// Initialize image optimization
document.addEventListener('DOMContentLoaded', function() {
    optimizeImages();
    createImageFallbacks();
});

// Expose validation functions globally for manual testing
window.SEOValidation = {
    runComprehensiveSEOTest,
    validateMetaTags,
    validateSocialMediaPreviews,
    validateStructuredData,
    validateImageOptimization,
    validateMobileResponsiveness,
    optimizeImages,
    createImageFallbacks
};