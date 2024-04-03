import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import * as React from "react";
import * as Location from "expo-location";
import * as TaskManager from 'expo-task-manager';
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./components/navigationStacks/tabNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar, StatusBarStyle } from "expo-status-bar";
import { useEffect } from "react";

export default function App() {
//   const geofenceTask = 'geofenceTask';
//   const region = [{latitude: 1, longitude: 1, radius: 5}]
//   useEffect(() => {
//     requestPermissions()
//   }, []);

// const requestPermissions = async () => {
//   const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
//   if (foregroundStatus === 'granted') {
//     console.log("granted")
//     const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
//     if(backgroundStatus === 'granted') {
//       console.log("granted")
//       Location.startGeofencingAsync(geofenceTask, region)
//     }
//     let location = await Location.getCurrentPositionAsync({})
//     console.log(location)
//     // foregroundSubscription = Location.watchPositionAsync({
//     //   accuracy: Location.Accuracy.High,
//     //   distanceInterval: 10
//     // })
//   }};

//   TaskManager.defineTask(geofenceTask, ({ data: { Enter }, error }) => {
//     if (error) {
//       console.log(error)
//       return;
//     }
//     if (eventType === GeofencingEventType.Enter) {
//       console.log("You've entered region:", region);
//     } else if (eventType === GeofencingEventType.Exit) {
//       console.log("You've left region:", region);
//     }
//   });

  return (
    <SafeAreaProvider>
      <NavigationContainer style={styles.container}>
        <TabNavigation />
        {/* <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" /> */}
      </NavigationContainer>
      <StatusBar style="dark" />
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
