import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import AllRecipes from './allRecipes';
import SavedRecipes from './savedRecipes';
import RandomRecipe from './randomRecipe';

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="All" component={AllRecipes} />
      <Tab.Screen name="Saved" component={SavedRecipes} />
      <Tab.Screen name="Random" component={RandomRecipe} />
    </Tab.Navigator>
  );
}