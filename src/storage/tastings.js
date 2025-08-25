import { ItemOperations, EventOperations } from '../database/DatabaseOperations';
import databaseHelper from '../database/DatabaseHelper';
import { CATEGORY_OPTIONS, normalizeCategory } from '../constants/categories';

// export so UI can import from storage if needed
export { CATEGORY_OPTIONS };

/**
 * Add a new tasting item to the database
 * @param {Object} item - The tasting item to add
 * @param {string} item.title - The title of the tasting
 * @param {string} item.brand - The brand of the item
 * @param {string} item.category - The category of the item
 * @param {number} item.rating - The rating (0-5)
 * @param {string} item.photoUri - The URI of the photo
 * @param {string} item.notes - Additional notes about the tasting
 * @returns {Promise<number>} The ID of the newly created item
 */
export const addItem = async (item) => {
  try {
    // Normalize category before storing
    const category = normalizeCategory(item.category);
    
    // Use the existing database operations to maintain consistency
    const id = await ItemOperations.insertItem({
      title: item.title,
      brand: item.brand,
      category: category,
      rating: item.rating,
      photoUri: item.photoUri,
      notes: item.notes // Note: This might need to be handled differently if the DB doesn't support notes
    });
    
    return id;
  } catch (error) {
    console.error('Error adding tasting item:', error);
    throw error;
  }
};

/**
 * Add a new tasting item and log the first try
 * @param {Object} item - The tasting item to add
 * @param {string} item.title - The title of the tasting
 * @param {string} item.brand - The brand of the item
 * @param {string} item.category - The category of the item
 * @param {number} item.rating - The rating (0-5)
 * @param {string} item.photoUri - The URI of the photo
 * @param {string} item.notes - Additional notes about the tasting
 * @param {string} dateTried - The date when this item was tried (ISO string)
 * @returns {Promise<number>} The ID of the newly created item
 */
export const addItemWithFirstTry = async (item, dateTried) => {
  try {
    // First create the item
    const id = await addItem(item);
    
    // Then log the first try with the specified date
    await logTry(id, dateTried);
    
    return id;
  } catch (error) {
    console.error('Error adding tasting item with first try:', error);
    throw error;
  }
};

/**
 * Get all tasting items
 * @returns {Promise<Array>} Array of all tasting items
 */
export const getAllItems = async () => {
  try {
    return await ItemOperations.getAllItems();
  } catch (error) {
    console.error('Error getting all tasting items:', error);
    throw error;
  }
};

/**
 * Get items by category
 * @param {string} category - The category to filter by
 * @returns {Promise<Array>} Array of items in the specified category
 */
export const getItemsByCategory = async (category) => {
  try {
    return await ItemOperations.getItemsByCategory(category);
  } catch (error) {
    console.error('Error getting items by category:', error);
    throw error;
  }
};

/**
 * Search items by title
 * @param {string} searchTerm - The search term
 * @returns {Promise<Array>} Array of matching items
 */
export const searchItems = async (searchTerm) => {
  try {
    return await ItemOperations.searchItemsByTitle(searchTerm);
  } catch (error) {
    console.error('Error searching items:', error);
    throw error;
  }
};

/**
 * Query items with optional filters and sorting
 * @param {Object} options - Query options
 * @param {string} options.search - Search term to filter by title
 * @param {string} options.category - Category to filter by
 * @param {string} options.sort - Sort order ('newest', 'oldest', 'rating', 'title')
 * @returns {Promise<Array>} Array of filtered and sorted items
 */
export const queryItems = async ({ search = '', category = '', sort = 'newest' } = {}) => {
  try {
    let items = [];

    // Get items based on filters
    if (category) {
      // Normalize category for consistent comparison
      const want = normalizeCategory(category).toLowerCase();
      items = await ItemOperations.getAllItems();
      items = items.filter(i => normalizeCategory(i.category).toLowerCase() === want);
    } else if (search) {
      items = await ItemOperations.searchItemsByTitle(search);
    } else {
      items = await ItemOperations.getAllItems();
    }

    // Apply additional search filter if category was specified
    if (category && search) {
      const lowerSearch = search.toLowerCase();
      items = items.filter(item => 
        item.title.toLowerCase().includes(lowerSearch) ||
        item.brand.toLowerCase().includes(lowerSearch)
      );
    }

    // Apply sorting
    switch (sort) {
      case 'oldest':
        items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'rating':
        items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'title':
        items.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'newest':
      default:
        items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return items;
  } catch (error) {
    console.error('Error querying items:', error);
    throw error;
  }
};

/**
 * Compute the current streak of days with tastings
 * @returns {Promise<number>} Number of consecutive days with tastings
 */
export const computeStreak = async () => {
  try {
    const events = await EventOperations.getRecentEvents(1000); // Get a large number of recent events
    
    if (events.length === 0) {
      return 0;
    }

    // Group events by date
    const eventsByDate = {};
    events.forEach(event => {
      const date = new Date(event.triedAt).toDateString();
      eventsByDate[date] = true;
    });

    // Get unique dates and sort them
    const dates = Object.keys(eventsByDate)
      .map(dateStr => new Date(dateStr))
      .sort((a, b) => b - a); // Sort newest first

    if (dates.length === 0) {
      return 0;
    }

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    
    let currentDate = new Date(today);
    
    // Check if there's an event today or yesterday to start the streak
    const latestEventDate = new Date(dates[0]);
    latestEventDate.setHours(0, 0, 0, 0);
    
    const daysDiff = Math.floor((today - latestEventDate) / (1000 * 60 * 60 * 24));
    
    // If the latest event is more than 1 day ago, streak is broken
    if (daysDiff > 1) {
      return 0;
    }
    
    // If latest event was yesterday, start checking from yesterday
    if (daysDiff === 1) {
      currentDate.setDate(currentDate.getDate() - 1);
    }

    // Count consecutive days
    for (const eventDate of dates) {
      const checkDate = new Date(eventDate);
      checkDate.setHours(0, 0, 0, 0);
      
      if (checkDate.getTime() === currentDate.getTime()) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (checkDate < currentDate) {
        // Gap found, streak is broken
        break;
      }
    }

    return streak;
  } catch (error) {
    console.error('Error computing streak:', error);
    return 0;
  }
};

/**
 * Get a single item by ID
 * @param {number} id - The ID of the item to retrieve
 * @returns {Promise<Object|null>} The item object or null if not found
 */
export const getItem = async (id) => {
  try {
    const items = await ItemOperations.getAllItems();
    const item = items.find(item => item.id === id);
    
    if (item) {
      // Get events/tries for this item
      const events = await EventOperations.getEventsForItem(id);
      // Add tries array to the item, sorted chronologically (oldest first)
      item.tries = events.map(event => event.triedAt).sort();
    }
    
    return item || null;
  } catch (error) {
    console.error('Error getting item:', error);
    return null;
  }
};

/**
 * Log a try for an item (record an event)
 * @param {number} itemId - The ID of the item being tried
 * @param {string} customDate - Optional custom date for the try (ISO string)
 * @returns {Promise<number>} The ID of the newly created event
 */
export const logTry = async (itemId, customDate = null) => {
  try {
    if (customDate) {
      // For custom dates, ensure it's date-only format (noon UTC)
      const customDateObj = new Date(customDate);
      const dateOnly = new Date(customDateObj.getFullYear(), customDateObj.getMonth(), customDateObj.getDate(), 12, 0, 0, 0);
      const dateOnlyISO = dateOnly.toISOString();
      
      const events = await databaseHelper.getEvents();
      const id = await databaseHelper.getNextId('eventId');
      
      const newEvent = {
        id,
        itemId,
        triedAt: dateOnlyISO
      };
      
      events.push(newEvent);
      await databaseHelper.saveEvents(events);
      return id;
    } else {
      // Store date only (no time) - use noon UTC to avoid timezone issues
      const currentDate = new Date();
      const dateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0, 0, 0);
      const dateOnlyISO = dateOnly.toISOString();
      
      const events = await databaseHelper.getEvents();
      const id = await databaseHelper.getNextId('eventId');
      
      const newEvent = {
        id,
        itemId,
        triedAt: dateOnlyISO
      };
      
      events.push(newEvent);
      await databaseHelper.saveEvents(events);
      return id;
    }
  } catch (error) {
    console.error('Error logging try:', error);
    throw error;
  }
};

/**
 * Update an existing item
 * @param {number} id - The ID of the item to update
 * @param {Object} updates - The fields to update
 * @returns {Promise<number>} Number indicating success (1) or failure (0)
 */
export const updateItem = async (id, updates) => {
  try {
    return await ItemOperations.updateItem(id, updates);
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

/**
 * Get all try dates for an item, sorted chronologically
 * @param {number} id - The ID of the item
 * @returns {Promise<Array<string>>} Array of ISO date strings, sorted chronologically
 */
export async function getTryDates(id) {
  const it = await getItem(id);
  const arr = (it?.tries || []).slice().sort();   // ISO strings sort lexicographically
  return arr;
}

/**
 * Get the last tried date for an item
 * @param {number} id - The ID of the item
 * @returns {Promise<string|null>} ISO date string of last try, or null if never tried
 */
export async function getLastTried(id) {
  const dates = await getTryDates(id);
  return dates.length ? dates[dates.length - 1] : null;
}
