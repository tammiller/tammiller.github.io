---
inclusion: manual
---

# AI Agent Instructions

This file contains reusable agent instructions for common tasks in this project.

## Event Manager Agent

**Trigger phrase**: "add event" or "update event"

**Purpose**: Manage events in the Ladybugs Aachen event system by adding new events or updating existing ones with LinkedIn URLs. Automatically maintains event archives and keeps only the 3 most recent upcoming events in the main file.

**Configuration**:
- Current events file: `events.json` (root directory) - contains the 3 most recent events by date
- Archive file: `events-archive.json` (root directory) - contains all older events
- Past events page: `vergangene-veranstaltungen.html` - loads from `events-archive.json`

**Instructions**:

### 1. Get Event Information from User
Ask the user for:
- LinkedIn event URL (required)
- Event date (if not creating a new event, this helps match existing events)
- If adding a new event, also ask for:
  - Event name
  - Description
  - Start date and time (ISO format: YYYY-MM-DDTHH:MM:SS)
  - End date and time (ISO format: YYYY-MM-DDTHH:MM:SS)
  - Keywords (comma-separated)
  - Location name and address

### 2. Load Current Data
- Read `events.json` (current/upcoming events)
- Read `events-archive.json` (past events) - create if it doesn't exist

### 3. Process Event

**If updating an existing event:**
- Search for the event by date or name in `events.json`
- Update the `url` field with the LinkedIn event URL
- Preserve all other event data

**If creating a new event:**
- Create a new event object with all provided information
- Set the `url` field to the LinkedIn event URL
- Add to `events.json`

### 4. Archive Management
After any update, reorganize the events:

**Sort all events:**
- Combine all events from both `events.json` and `events-archive.json`
- Sort all events by `startDate` in descending order (newest first)

**Split events:**
- **Keep in events.json**: The 3 most recent events by date (regardless of whether they're past or future)
- **Move to events-archive.json**: All other events (4th event and older)

**Update files:**
- `events.json` contains exactly the 3 most recent events (sorted by `startDate`, newest first)
- `events-archive.json` contains all remaining events (sorted by `startDate`, newest first)
- Maintain proper JSON formatting with 2-space indentation

**Note**: This keeps the main page design clean by always showing exactly 3 events, even if some have already passed.

### 5. Update Past Events Page
- Modify `vergangene-veranstaltungen.html` to load from `events-archive.json` instead of `events.json`
- Update the fetch URL in the JavaScript from `'events.json'` to `'events-archive.json'`
- Remove the date filtering logic since the archive only contains past events

### 6. Report Results
Show the user:
- What was updated or created
- How many events are in `events.json` (should be exactly 3)
- How many events are in `events-archive.json`
- Confirmation that files were saved

**Example usage**:
```
User: "add event"
Agent: "Please provide the LinkedIn event URL"
User: "https://www.linkedin.com/events/123456"
Agent: "Is this for an existing event or a new event?"
User: "Existing - Januarmeeting on 2026-01-26"
Agent: [finds event, updates URL, reorganizes archives]
Agent: "✓ Updated Januarmeeting with LinkedIn URL
       ✓ events.json: 3 most recent events (Märzmeeting, Februarmeeting, Januarmeeting)
       ✓ events-archive.json: 24 older events"
```

**Error handling**:
- If event date is ambiguous, ask user to clarify
- If creating new event and required fields are missing, prompt for them
- If JSON structure is invalid, report error before attempting changes
- If `events-archive.json` doesn't exist, create it as an empty array `[]`

**Data Structure**:
Each event object should follow this structure:
```json
{
  "name": "Event Name",
  "description": "Event description",
  "startDate": "2026-01-26T18:30:00",
  "endDate": "2026-01-26T21:00:00",
  "url": "https://www.linkedin.com/events/...",
  "keywords": "keyword1, keyword2, keyword3",
  "location": {
    "name": "Venue Name",
    "address": "Street Address, Postal Code City"
  }
}
```

**Notes**:
- Always maintain exactly 3 events in `events.json` (the 3 most recent by date)
- Events are archived based on chronological order, not whether they're past or future
- The archive grows over time as new events are added
- This ensures the main site design stays clean with a consistent 3-event display
