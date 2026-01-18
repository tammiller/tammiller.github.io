# Changelog

All notable changes to the Ladybugs Aachen website will be documented in this file.

## [1.2.0] - 2025-09-01

### Added
- Added "Vergangene Veranstaltungen" (Past Events) page
  - Displays all past events with pagination (9 events per page)
  - Automatically filters out future events based on current date
  - Shows event name, description, date, link, and keywords
  - Responsive card-based layout with Bootstrap styling
  - Smart pagination with ellipsis for large page counts
  - Added to sitemap for SEO optimization
- Added link to past events at bottom of main events section
- Enhanced navigation with proper active page detection

### Changed
- Removed "Vergangene Veranstaltungen" from main navigation menu for cleaner UI
- Updated sitemap.xml to include new past events page

## [1.1.0] - 2025-08-28

### Added
- Added events for October and November 2025

### Changed
- Simplified logic for events
  - Consolidated all events into single events.json file
  - Removed complex event management system
  - Always display 3 most recent events chronologically

## [1.0.0] - 2025-06-14

### Added
- Created reusable components system (navbar, footer, cookie banner)
- Added SEO improvements:
  - Enhanced meta tags and structured data
  - Added Open Graph and X (Twitter) card meta tags
  - Added canonical URLs and sitemap
  - Added bilingual content support
- Added clean URL support with 404.html redirect
- Added event structured data for Google visibility

### Changed
- Refactored event data management:
  - Moved events from JSON to HTML structured data
  - Updated time format to 24-hour (18:30 instead of 06:30 PM)
  - Added German locale for consistent formatting
- Updated page structure:
  - Removed duplicate code
  - Improved maintainability
  - Enhanced semantic HTML
  - Updated navigation and links
- Improved SEO:
  - Updated meta descriptions
  - Added keywords
  - Enhanced page titles
  - Added robots meta tag
