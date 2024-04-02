import { createStackNavigator } from "@react-navigation/stack";
import LocalRecipes from "./localRecipes";
import LocalRecipe from "./localRecipe";

const LocalStack = createStackNavigator();

export default function LocalStackScreen() {
  return (
    <LocalStack.Navigator>
      <LocalStack.Screen name="Local recipes" component={LocalRecipes} />
      <LocalStack.Screen name="Local recipe" component={LocalRecipe} options={{headerShown: false}}/>
    </LocalStack.Navigator>
  );
}
