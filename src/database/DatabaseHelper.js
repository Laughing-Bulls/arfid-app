import * as SQLite from 'expo-sqlite';

class DatabaseHelper {
  constructor() {
    this.db = null;
    this.dbName = 'recipes.db';
  }

  // Open database and initialize tables
  async initDatabase() {
    try {
      // Open the database
      this.db = SQLite.openDatabase(this.dbName);
      
      // Create tables if they don't exist
      await this.createTables();
      
      // Create indexes
      await this.createIndexes();
      
      console.log('Database initialized successfully');
      return true;
    } catch (error) {
      console.error('Error initializing database:', error);
      return false;
    }
  }

  // Create tables with the specified schema
  createTables() {
    return new Promise((resolve, reject) => {
      this.db.transaction(
        (tx) => {
          // Create items table
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS items (
              id INTEGER PRIMARY KEY,
              title TEXT NOT NULL,
              brand TEXT,
              category TEXT,
              rating INTEGER,
              photoUri TEXT,
              createdAt TEXT NOT NULL,
              updatedAt TEXT NOT NULL
            );`
          );

          // Create events table
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS events (
              id INTEGER PRIMARY KEY,
              itemId INTEGER NOT NULL,
              triedAt TEXT NOT NULL,
              FOREIGN KEY (itemId) REFERENCES items (id)
            );`
          );
        },
        (error) => {
          console.error('Error creating tables:', error);
          reject(error);
        },
        () => {
          console.log('Tables created successfully');
          resolve();
        }
      );
    });
  }

  // Create indexes for better performance
  createIndexes() {
    return new Promise((resolve, reject) => {
      this.db.transaction(
        (tx) => {
          // Index on title for search functionality
          tx.executeSql(
            'CREATE INDEX IF NOT EXISTS idx_items_title ON items (title);'
          );

          // Index on category for filtering
          tx.executeSql(
            'CREATE INDEX IF NOT EXISTS idx_items_category ON items (category);'
          );

          // Index on triedAt for sorting events by date
          tx.executeSql(
            'CREATE INDEX IF NOT EXISTS idx_events_triedAt ON events (triedAt);'
          );

          // Index on itemId for faster joins
          tx.executeSql(
            'CREATE INDEX IF NOT EXISTS idx_events_itemId ON events (itemId);'
          );
        },
        (error) => {
          console.error('Error creating indexes:', error);
          reject(error);
        },
        () => {
          console.log('Indexes created successfully');
          resolve();
        }
      );
    });
  }

  // Get database instance
  getDatabase() {
    return this.db;
  }

  // Close database (if needed)
  closeDatabase() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

// Create and export a singleton instance
const databaseHelper = new DatabaseHelper();
export default databaseHelper;
