import { createStackNavigator } from "@react-navigation/stack";
import SavedRecipes from "./savedRecipes";

const SavedStack = createStackNavigator();

export default function SavedStackScreen() {
  return (
    <SavedStack.Navigator>
      <SavedStack.Screen name="Saved recipes" component={SavedRecipes} />
    </SavedStack.Navigator>
  );
}
