import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/Home/HomeScreen';
import RecipeScreen from '../screens/Recipe/RecipeScreen';
import RecipesListScreen from '../screens/RecipesList/RecipesListScreen';
import IngredientScreen from '../screens/Ingredient/IngredientScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import IngredientsDetailsScreen from '../screens/IngredientsDetails/IngredientsDetailsScreen';
import NewTastingScreen from '../screens/NewTastingScreen';
import EditTastingScreen from '../screens/EditTastingScreen';
import TryHistoryScreen from '../screens/TryHistoryScreen';
import StatsScreen from '../screens/StatsScreen';
import FriendsScreen from '../screens/FriendsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Drawer = createDrawerNavigator();

function AppDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Tastings">
      <Drawer.Screen name="Tastings" component={HomeScreen} options={{ title: 'Tastings' }} />
      <Drawer.Screen name="AddTasting" component={NewTastingScreen} options={{ title: 'Add Tasting' }} />
      <Drawer.Screen name="Search" component={SearchScreen} options={{ title: 'Search' }} />
      <Drawer.Screen name="Stats" component={StatsScreen} options={{ title: 'Stats' }} />
      <Drawer.Screen name="Friends" component={FriendsScreen} options={{ title: 'Friends' }} />
      <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      {/* Detail screens - hidden from drawer but accessible via navigation */}
      <Drawer.Screen name="Recipe" component={RecipeScreen} options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="RecipesList" component={RecipesListScreen} options={{ drawerItemStyle: { display: 'none' }, title: 'Tastings' }} />
      <Drawer.Screen name="Ingredient" component={IngredientScreen} options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="IngredientsDetails" component={IngredientsDetailsScreen} options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="NewTasting" component={NewTastingScreen} options={{ drawerItemStyle: { display: 'none' }, title: 'New Tasting' }} />
      <Drawer.Screen name="EditTasting" component={EditTastingScreen} options={{ drawerItemStyle: { display: 'none' }, title: 'Edit Tasting' }} />
      <Drawer.Screen name="TryHistory" component={TryHistoryScreen} options={{ drawerItemStyle: { display: 'none' }, title: 'All tries' }} />
    </Drawer.Navigator>
  );
}

export default function AppContainer() {
  return (
    <NavigationContainer>
      <AppDrawer/>
    </NavigationContainer>
  );
}

console.disableYellowBox = true;