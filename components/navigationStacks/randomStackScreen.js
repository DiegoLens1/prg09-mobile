import { createStackNavigator } from "@react-navigation/stack";
import RandomRecipe from "../randomRecipe";

const RandomStack = createStackNavigator();

export default function RandomStackScreen() {
  return (
    <RandomStack.Navigator>
      <RandomStack.Screen name="Random recipe" component={RandomRecipe} options={{headerShown: false}}/>
    </RandomStack.Navigator>
  );
}
