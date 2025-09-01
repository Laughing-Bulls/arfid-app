import { createStackNavigator } from '@react-navigation/stack';
import AppDrawer from './AppNavigation';
import StockPickerScreen from '../screens/StockPickerScreen';

const RootStack = createStackNavigator();

export default function RootNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Root"
        component={AppDrawer}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="StockPicker"
        component={StockPickerScreen}
        options={{ title: 'Stock photos', presentation: 'modal' }}
      />
    </RootStack.Navigator>
  );
}
