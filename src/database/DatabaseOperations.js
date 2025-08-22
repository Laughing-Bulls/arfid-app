import databaseHelper from './DatabaseHelper';

// Item operations
export const ItemOperations = {
  // Insert a new item
  async insertItem(item) {
    if (!databaseHelper.isDatabaseReady()) {
      throw new Error('Database not ready. Please wait for initialization.');
    }

    try {
      const { title, brand, category, rating, photoUri } = item;
      const now = new Date().toISOString();
      
      // Get current items
      const items = await databaseHelper.getItems();
      
      // Get next ID
      const id = await databaseHelper.getNextId('itemId');
      
      // Create new item
      const newItem = {
        id,
        title,
        brand,
        category,
        rating,
        photoUri,
        createdAt: now,
        updatedAt: now
      };
      
      // Add to items array
      items.push(newItem);
      
      // Save back to storage
      await databaseHelper.saveItems(items);
      
      return id;
    } catch (error) {
      throw new Error(`Failed to insert item: ${error.message}`);
    }
  },

  // Get all items
  async getAllItems() {
    if (!databaseHelper.isDatabaseReady()) {
      throw new Error('Database not ready. Please wait for initialization.');
    }

    try {
      const items = await databaseHelper.getItems();
      // Sort by createdAt descending (newest first)
      return items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      throw new Error(`Failed to get items: ${error.message}`);
    }
  },

  // Get items by category
  async getItemsByCategory(category) {
    if (!databaseHelper.isDatabaseReady()) {
      throw new Error('Database not ready. Please wait for initialization.');
    }

    try {
      const items = await databaseHelper.getItems();
      return items
        .filter(item => item.category === category)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      throw new Error(`Failed to get items by category: ${error.message}`);
    }
  },

  // Search items by title
  async searchItemsByTitle(searchTerm) {
    if (!databaseHelper.isDatabaseReady()) {
      throw new Error('Database not ready. Please wait for initialization.');
    }

    try {
      const items = await databaseHelper.getItems();
      const lowerSearchTerm = searchTerm.toLowerCase();
      return items
        .filter(item => item.title.toLowerCase().includes(lowerSearchTerm))
        .sort((a, b) => a.title.localeCompare(b.title));
    } catch (error) {
      throw new Error(`Failed to search items: ${error.message}`);
    }
  },

  // Update item
  async updateItem(id, updates) {
    if (!databaseHelper.isDatabaseReady()) {
      throw new Error('Database not ready. Please wait for initialization.');
    }

    try {
      const items = await databaseHelper.getItems();
      const itemIndex = items.findIndex(item => item.id === id);
      
      if (itemIndex === -1) {
        throw new Error('Item not found');
      }
      
      // Update the item
      items[itemIndex] = {
        ...items[itemIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      // Save back to storage
      await databaseHelper.saveItems(items);
      
      return 1; // Return 1 to indicate success (similar to SQL rowsAffected)
    } catch (error) {
      throw new Error(`Failed to update item: ${error.message}`);
    }
  },

  // Delete item
  async deleteItem(id) {
    if (!databaseHelper.isDatabaseReady()) {
      throw new Error('Database not ready. Please wait for initialization.');
    }

    try {
      // First delete related events
      const events = await databaseHelper.getEvents();
      const filteredEvents = events.filter(event => event.itemId !== id);
      await databaseHelper.saveEvents(filteredEvents);
      
      // Then delete the item
      const items = await databaseHelper.getItems();
      const filteredItems = items.filter(item => item.id !== id);
      await databaseHelper.saveItems(filteredItems);
      
      return 1; // Return 1 to indicate success
    } catch (error) {
      throw new Error(`Failed to delete item: ${error.message}`);
    }
  }
};

// Event operations
export const EventOperations = {
  // Record a new event (trying an item)
  async recordEvent(itemId) {
    if (!databaseHelper.isDatabaseReady()) {
      throw new Error('Database not ready. Please wait for initialization.');
    }

    try {
      const triedAt = new Date().toISOString();
      
      // Get current events
      const events = await databaseHelper.getEvents();
      
      // Get next ID
      const id = await databaseHelper.getNextId('eventId');
      
      // Create new event
      const newEvent = {
        id,
        itemId,
        triedAt
      };
      
      // Add to events array
      events.push(newEvent);
      
      // Save back to storage
      await databaseHelper.saveEvents(events);
      
      return id;
    } catch (error) {
      throw new Error(`Failed to record event: ${error.message}`);
    }
  },

  // Get all events for an item
  async getEventsForItem(itemId) {
    if (!databaseHelper.isDatabaseReady()) {
      throw new Error('Database not ready. Please wait for initialization.');
    }

    try {
      const events = await databaseHelper.getEvents();
      return events
        .filter(event => event.itemId === itemId)
        .sort((a, b) => new Date(b.triedAt) - new Date(a.triedAt));
    } catch (error) {
      throw new Error(`Failed to get events for item: ${error.message}`);
    }
  },

  // Get recent events across all items
  async getRecentEvents(limit = 10) {
    if (!databaseHelper.isDatabaseReady()) {
      throw new Error('Database not ready. Please wait for initialization.');
    }

    try {
      const events = await databaseHelper.getEvents();
      const items = await databaseHelper.getItems();
      
      // Create a map of items for quick lookup
      const itemsMap = {};
      items.forEach(item => {
        itemsMap[item.id] = item;
      });
      
      // Join events with item data and sort by triedAt
      const eventsWithItems = events
        .map(event => ({
          ...event,
          title: itemsMap[event.itemId]?.title || 'Unknown',
          category: itemsMap[event.itemId]?.category || 'Unknown'
        }))
        .sort((a, b) => new Date(b.triedAt) - new Date(a.triedAt))
        .slice(0, limit);
      
      return eventsWithItems;
    } catch (error) {
      throw new Error(`Failed to get recent events: ${error.message}`);
    }
  }
};
