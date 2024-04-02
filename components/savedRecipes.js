import * as React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import RecipeListRenderItem from "./recipeListRenderItem";

export default function SavedRecipes() {
  const [recipes, setRecipes] = useState([]);
  const getRecipes = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const storageValues = await AsyncStorage.multiGet(keys);
      const values = storageValues.map((val) => JSON.parse(val[1]));
      setRecipes(values);
      // console.log(JSON.parse(recipes[0][1]))
      // values != null ? JSON.parse(values) : null
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getRecipes();
  }, []);
  return (
    <React.Fragment>
      <View style={styles.mainContainer}>
        <FlatList
          data={recipes}
          renderItem={({ item }) => <RecipeListRenderItem data={item} navTarget={'Saved recipe'}/>}
        />
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
