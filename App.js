import React, { useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigations/RootNavigator';
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
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
