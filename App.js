import React, { useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
import AppContainer from './src/navigations/AppNavigation';
import databaseHelper from './src/database/DatabaseHelper';

enableScreens(true);

export default function App() {
  useEffect(() => {
    // Initialize database when app starts
    const initDB = async () => {
      try {
        await databaseHelper.initDatabase();
      } catch (error) {
        console.error('Failed to initialize database:', error);
      }
    };
    
    initDB();
  }, []);

  return (
     <AppContainer />
  );
}
