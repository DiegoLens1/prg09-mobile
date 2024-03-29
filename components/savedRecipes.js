import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SavedRecipes() {
  return (
    <React.Fragment>
      <View style={styles.mainContainer}>
        <Text>Saved recipes</Text>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
