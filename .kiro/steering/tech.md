# Technology Stack

## Frontend Technologies
- **HTML5**: Semantic markup with structured data (JSON-LD)
- **CSS3**: Custom styles with responsive design
- **Vanilla JavaScript**: Component-based architecture without frameworks
- **Bootstrap 5.3.3**: CSS framework for responsive layout and components
- **Font Awesome 5.15.3**: Icon library

## Build System
- **Static Site**: No build process required - direct HTML/CSS/JS files
- **GitHub Pages**: Hosting platform (based on CNAME file)
- **No package.json**: Pure frontend without Node.js dependencies

## Key Libraries & CDNs
- Bootstrap CSS/JS from CDN
- Font Awesome from CDN
- Custom Quicksand font (self-hosted)

## Architecture Patterns
- **Component-based JavaScript**: Reusable components (navbar, footer, cookie banner)
- **Event-driven**: DOM manipulation on page load
- **Structured Data**: JSON-LD for SEO and event schema
- **Progressive Enhancement**: Works without JavaScript

## Development Workflow
Since this is a static site with no build process:

### Local Development
```bash
# Serve locally (any static server)
python -m http.server 8000
# or
npx serve .
```

### Deployment
- Push to main branch
- GitHub Pages automatically deploys
- No build step required

## File Organization
- Static assets in dedicated folders (`images/`, `fonts/`)
- Single CSS file for all styles
- Single JS file for components
- Event data embedded in HTML as structured data
- Separate JSON files for historical event data