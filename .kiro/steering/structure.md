# Project Structure

## Root Directory Layout
```
├── index.html              # Main homepage
├── impressum.html          # Legal/privacy page (German requirement)
├── 404.html               # GitHub Pages 404 redirect
├── style.css              # All custom styles
├── components.js          # Reusable UI components
├── CNAME                  # Custom domain configuration
├── sitemap.xml           # SEO sitemap
├── CHANGELOG.md          # Version history
└── .gitignore            # Git ignore rules
```

## Asset Organization
```
├── images/               # All visual assets
│   ├── favicon.ico      # Browser icon
│   ├── favicon-32x32.png # PNG favicon
│   ├── ladybug.jpeg     # Logo/brand image
│   ├── hintergrund.png  # Background image
│   └── *.jpeg           # Event photos
├── fonts/               # Self-hosted fonts
│   └── Quicksand-VariableFont_wght.ttf
```

## Data Files
```
├── events.json              # Current/upcoming events (max 3 most recent)
├── events-archive.json      # Historical events archive (all past events)
```

## Configuration Directories
```
├── .git/               # Git repository
├── .idea/              # JetBrains IDE settings
├── .vscode/            # VS Code settings
├── .kiro/              # Kiro AI assistant settings
```

## Content Organization Principles

### HTML Structure
- **Semantic markup**: Use proper HTML5 elements
- **Dynamic structured data**: JSON-LD automatically generated and injected by EventManager
- **Component containers**: Dedicated divs for JS-injected components
- **Bilingual content**: German primary, English secondary

### CSS Architecture
- **Single file**: All styles in `style.css`
- **Mobile-first**: Responsive design with media queries
- **Component-scoped**: CSS organized by page sections
- **Bootstrap integration**: Custom styles complement Bootstrap

### JavaScript Patterns
- **Component functions**: Each UI component as a function
- **Event-driven initialization**: DOMContentLoaded listeners
- **Progressive enhancement**: Core functionality works without JS
- **No external dependencies**: Pure vanilla JavaScript

### Event Data Management
- **Current events**: Stored in `events.json` (always the 3 most recent events by date)
- **Historical events**: Archived in `events-archive.json` (all events except the 3 most recent)
- **Automatic archiving**: Events are moved to archive when they're no longer in the top 3 most recent
- **Dynamic rendering**: JavaScript EventManager handles display and SEO
- **Schema.org compliance**: Structured data automatically generated from event data
- **Past events page**: `vergangene-veranstaltungen.html` loads from `events-archive.json`