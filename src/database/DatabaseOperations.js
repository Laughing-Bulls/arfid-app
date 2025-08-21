import databaseHelper from './DatabaseHelper';

// Item operations
export const ItemOperations = {
  // Insert a new item
  async insertItem(item) {
    return new Promise((resolve, reject) => {
      const { title, brand, category, rating, photoUri } = item;
      const now = new Date().toISOString();
      
      databaseHelper.getDatabase().transaction(
        (tx) => {
          tx.executeSql(
            `INSERT INTO items (title, brand, category, rating, photoUri, createdAt, updatedAt) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [title, brand, category, rating, photoUri, now, now],
            (_, result) => resolve(result.insertId),
            (_, error) => reject(error)
          );
        }
      );
    });
  },

  // Get all items
  async getAllItems() {
    return new Promise((resolve, reject) => {
      databaseHelper.getDatabase().transaction(
        (tx) => {
          tx.executeSql(
            'SELECT * FROM items ORDER BY createdAt DESC',
            [],
            (_, { rows: { _array } }) => resolve(_array),
            (_, error) => reject(error)
          );
        }
      );
    });
  },

  // Get items by category
  async getItemsByCategory(category) {
    return new Promise((resolve, reject) => {
      databaseHelper.getDatabase().transaction(
        (tx) => {
          tx.executeSql(
            'SELECT * FROM items WHERE category = ? ORDER BY createdAt DESC',
            [category],
            (_, { rows: { _array } }) => resolve(_array),
            (_, error) => reject(error)
          );
        }
      );
    });
  },

  // Search items by title
  async searchItemsByTitle(searchTerm) {
    return new Promise((resolve, reject) => {
      databaseHelper.getDatabase().transaction(
        (tx) => {
          tx.executeSql(
            'SELECT * FROM items WHERE title LIKE ? ORDER BY title',
            [`%${searchTerm}%`],
            (_, { rows: { _array } }) => resolve(_array),
            (_, error) => reject(error)
          );
        }
      );
    });
  },

  // Update item
  async updateItem(id, updates) {
    return new Promise((resolve, reject) => {
      const { title, brand, category, rating, photoUri } = updates;
      const now = new Date().toISOString();
      
      databaseHelper.getDatabase().transaction(
        (tx) => {
          tx.executeSql(
            `UPDATE items SET title = ?, brand = ?, category = ?, rating = ?, photoUri = ?, updatedAt = ? 
             WHERE id = ?`,
            [title, brand, category, rating, photoUri, now, id],
            (_, result) => resolve(result.rowsAffected),
            (_, error) => reject(error)
          );
        }
      );
    });
  },

  // Delete item
  async deleteItem(id) {
    return new Promise((resolve, reject) => {
      databaseHelper.getDatabase().transaction(
        (tx) => {
          // First delete related events
          tx.executeSql(
            'DELETE FROM events WHERE itemId = ?',
            [id],
            (_, result) => {},
            (_, error) => reject(error)
          );
          
          // Then delete the item
          tx.executeSql(
            'DELETE FROM items WHERE id = ?',
            [id],
            (_, result) => resolve(result.rowsAffected),
            (_, error) => reject(error)
          );
        }
      );
    });
  }
};

// Event operations
export const EventOperations = {
  // Record a new event (trying an item)
  async recordEvent(itemId) {
    return new Promise((resolve, reject) => {
      const triedAt = new Date().toISOString();
      
      databaseHelper.getDatabase().transaction(
        (tx) => {
          tx.executeSql(
            'INSERT INTO events (itemId, triedAt) VALUES (?, ?)',
            [itemId, triedAt],
            (_, result) => resolve(result.insertId),
            (_, error) => reject(error)
          );
        }
      );
    });
  },

  // Get all events for an item
  async getEventsForItem(itemId) {
    return new Promise((resolve, reject) => {
      databaseHelper.getDatabase().transaction(
        (tx) => {
          tx.executeSql(
            'SELECT * FROM events WHERE itemId = ? ORDER BY triedAt DESC',
            [itemId],
            (_, { rows: { _array } }) => resolve(_array),
            (_, error) => reject(error)
          );
        }
      );
    });
  },

  // Get recent events across all items
  async getRecentEvents(limit = 10) {
    return new Promise((resolve, reject) => {
      databaseHelper.getDatabase().transaction(
        (tx) => {
          tx.executeSql(
            `SELECT e.*, i.title, i.category 
             FROM events e 
             JOIN items i ON e.itemId = i.id 
             ORDER BY e.triedAt DESC 
             LIMIT ?`,
            [limit],
            (_, { rows: { _array } }) => resolve(_array),
            (_, error) => reject(error)
          );
        }
      );
    });
  }
};
