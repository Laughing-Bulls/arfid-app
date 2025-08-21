# Database Setup

This directory contains the SQLite database implementation for the React Native recipes app.

## Installation

The database uses `expo-sqlite` which has been installed via:
```bash
npx expo install expo-sqlite
```

**Note**: After installing, you'll need to rebuild your native app once.

## Schema

### Version 1

#### Items Table
```sql
CREATE TABLE items (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  brand TEXT,
  category TEXT,
  rating INTEGER,
  photoUri TEXT,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);
```

#### Events Table
```sql
CREATE TABLE events (
  id INTEGER PRIMARY KEY,
  itemId INTEGER NOT NULL,
  triedAt TEXT NOT NULL,
  FOREIGN KEY (itemId) REFERENCES items (id)
);
```

### Indexes
- `idx_items_title` - For search functionality
- `idx_items_category` - For category filtering
- `idx_events_triedAt` - For sorting events by date
- `idx_events_itemId` - For faster joins

## Usage

### Database Helper
```javascript
import { databaseHelper } from '../database';

// Initialize database (called automatically in App.js)
await databaseHelper.initDatabase();

// Get database instance
const db = databaseHelper.getDatabase();
```

### Item Operations
```javascript
import { ItemOperations } from '../database';

// Insert new item
const itemId = await ItemOperations.insertItem({
  title: 'Recipe Name',
  brand: 'Brand Name',
  category: 'Category',
  rating: 5,
  photoUri: 'path/to/photo'
});

// Get all items
const items = await ItemOperations.getAllItems();

// Search items
const results = await ItemOperations.searchItemsByTitle('search term');

// Update item
await ItemOperations.updateItem(itemId, { rating: 4 });

// Delete item
await ItemOperations.deleteItem(itemId);
```

### Event Operations
```javascript
import { EventOperations } from '../database';

// Record trying an item
await EventOperations.recordEvent(itemId);

// Get events for specific item
const events = await EventOperations.getEventsForItem(itemId);

// Get recent events across all items
const recentEvents = await EventOperations.getRecentEvents(10);
```

## Database Initialization

The database is automatically initialized when the app starts in `App.js`. The initialization process:

1. Opens the SQLite database
2. Creates tables if they don't exist
3. Creates indexes for performance
4. Logs success/failure to console

## Testing

A test button has been added to the HomeScreen to verify database functionality:
- Tests item insertion
- Tests event recording
- Tests data retrieval
- Shows database status

## File Structure

- `DatabaseHelper.js` - Core database initialization and management
- `DatabaseOperations.js` - CRUD operations for items and events
- `index.js` - Exports for easy importing
- `README.md` - This documentation
