import React from 'react';
import { enableScreens } from 'react-native-screens';
import AppContainer from './src/navigations/AppNavigation';

enableScreens(true);

export default function App() {
  return (
     <AppContainer />
  );
}
