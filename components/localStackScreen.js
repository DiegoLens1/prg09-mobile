import { createStackNavigator } from "@react-navigation/stack";
import LocalRecipe from "./localRecipes";

const LocalStack = createStackNavigator();

export default function LocalStackScreen() {
  return (
    <LocalStack.Navigator>
      <LocalStack.Screen name="Local recipe" component={LocalRecipe} />
    </LocalStack.Navigator>
  );
}
