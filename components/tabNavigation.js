import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { createStackNavigator } from "@react-navigation/stack";
import RandomStackScreen from "./randomStackScreen";
import LocalStackScreen from "./localStackScreen";
import SavedStackScreen from "./savedStackScreen";

const Tab = createMaterialBottomTabNavigator();
const LocalStack = createStackNavigator();
const SavedStack = createStackNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Random" component={RandomStackScreen} />
      <Tab.Screen name="Local" component={LocalStackScreen} />
      <Tab.Screen name="Saved" component={SavedStackScreen} />
    </Tab.Navigator>
  );
}
