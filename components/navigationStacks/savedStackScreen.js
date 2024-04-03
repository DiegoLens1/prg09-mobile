import { createStackNavigator } from "@react-navigation/stack";
import SavedRecipes from "../savedRecipes";
import SavedRecipe from "../savedRecipe";

const SavedStack = createStackNavigator();

export default function SavedStackScreen() {
  return (
    <SavedStack.Navigator>
      <SavedStack.Screen name="Saved recipes" component={SavedRecipes} />
      <SavedStack.Screen name="Saved recipe" component={SavedRecipe} options={{headerShown: false}}/>
    </SavedStack.Navigator>
  );
}
