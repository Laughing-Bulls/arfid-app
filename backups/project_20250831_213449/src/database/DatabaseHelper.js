import AsyncStorage from '@react-native-async-storage/async-storage';

class DatabaseHelper {
  constructor() {
    this.isInitialized = false;
    this.ITEMS_KEY = '@recipes_items';
    this.EVENTS_KEY = '@recipes_events';
    this.COUNTERS_KEY = '@recipes_counters';
  }

  // Initialize database (AsyncStorage doesn't need initialization, but we'll set up structure)
  async initDatabase() {
    try {
      // Always check if data exists and initialize structure if needed
      await this.initializeDataStructure();
      
      this.isInitialized = true;
      
      // Log database stats for debugging
      const stats = await this.getDatabaseStats();
      console.log('AsyncStorage database initialized successfully', stats);
      return true;
    } catch (error) {
      console.error('Error initializing database:', error);
      this.isInitialized = false;
      return false;
    }
  }

  // Initialize data structure
  async initializeDataStructure() {
    try {
      // Check if items exist, if not create empty array
      const items = await AsyncStorage.getItem(this.ITEMS_KEY);
      if (items === null) {
        await AsyncStorage.setItem(this.ITEMS_KEY, JSON.stringify([]));
      }

      // Check if events exist, if not create empty array
      const events = await AsyncStorage.getItem(this.EVENTS_KEY);
      if (events === null) {
        await AsyncStorage.setItem(this.EVENTS_KEY, JSON.stringify([]));
      }

      // Initialize counters for auto-incrementing IDs
      const counters = await AsyncStorage.getItem(this.COUNTERS_KEY);
      if (counters === null) {
        await AsyncStorage.setItem(this.COUNTERS_KEY, JSON.stringify({ itemId: 1, eventId: 1 }));
      }

      console.log('Data structure initialized');
    } catch (error) {
      throw new Error(`Failed to initialize data structure: ${error.message}`);
    }
  }

  // Check if database is ready - always try to initialize if not ready
  async isDatabaseReady() {
    if (!this.isInitialized) {
      console.log('Database not initialized, attempting to initialize...');
      await this.initDatabase();
    }
    return this.isInitialized;
  }

  // Get all items
  async getItems() {
    try {
      const items = await AsyncStorage.getItem(this.ITEMS_KEY);
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error('Error getting items:', error);
      return [];
    }
  }

  // Save items
  async saveItems(items) {
    try {
      await AsyncStorage.setItem(this.ITEMS_KEY, JSON.stringify(items));
      return true;
    } catch (error) {
      console.error('Error saving items:', error);
      return false;
    }
  }

  // Get all events
  async getEvents() {
    try {
      const events = await AsyncStorage.getItem(this.EVENTS_KEY);
      return events ? JSON.parse(events) : [];
    } catch (error) {
      console.error('Error getting events:', error);
      return [];
    }
  }

  // Save events
  async saveEvents(events) {
    try {
      await AsyncStorage.setItem(this.EVENTS_KEY, JSON.stringify(events));
      return true;
    } catch (error) {
      console.error('Error saving events:', error);
      return false;
    }
  }

  // Get next ID for items or events
  async getNextId(type) {
    try {
      const counters = await AsyncStorage.getItem(this.COUNTERS_KEY);
      const parsedCounters = counters ? JSON.parse(counters) : { itemId: 1, eventId: 1 };
      
      const nextId = parsedCounters[type];
      parsedCounters[type] = nextId + 1;
      
      await AsyncStorage.setItem(this.COUNTERS_KEY, JSON.stringify(parsedCounters));
      return nextId;
    } catch (error) {
      console.error('Error getting next ID:', error);
      return 1;
    }
  }

  // Clear all data (for testing)
  async clearAllData() {
    try {
      await AsyncStorage.multiRemove([this.ITEMS_KEY, this.EVENTS_KEY, this.COUNTERS_KEY]);
      await this.initializeDataStructure();
      console.log('All data cleared');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }

  // Get database info for debugging
  getDatabaseInfo() {
    return {
      isInitialized: this.isInitialized,
      storageType: 'AsyncStorage',
      keys: [this.ITEMS_KEY, this.EVENTS_KEY, this.COUNTERS_KEY]
    };
  }

  // Get database statistics
  async getDatabaseStats() {
    try {
      const items = await this.getItems();
      const events = await this.getEvents();
      
      return {
        totalItems: items.length,
        totalEvents: events.length,
        storageKeys: [this.ITEMS_KEY, this.EVENTS_KEY, this.COUNTERS_KEY]
      };
    } catch (error) {
      console.error('Error getting database stats:', error);
      return { totalItems: 0, totalEvents: 0, storageKeys: [] };
    }
  }
}

// Create and export a singleton instance
const databaseHelper = new DatabaseHelper();
export default databaseHelper;
