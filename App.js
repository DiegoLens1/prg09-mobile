import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./components/tabNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar, StatusBarStyle } from "expo-status-bar";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer style={styles.container}>
        <TabNavigation />
        {/* <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" /> */}
      </NavigationContainer>
      <StatusBar style="dark"/>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
