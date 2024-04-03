import * as React from "react";
import { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RecipeListRenderItem from "./recipeListRenderItem";

export default function LocalRecipes() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const getRecipes = async () => {
      //fetch data from api and sets it in state.
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?f=b"
        );
        const json = await response.json();
        setRecipes(json);
      } catch (error) {
        console.error(error);
      }
    };
    getRecipes();
  }, []);
  return (
    <React.Fragment>
      <View style={styles.mainContainer}>
        {recipes && (
          <FlatList
            data={recipes.meals}
            renderItem={({ item }) => <RecipeListRenderItem data={item} navTarget={'Local recipe'}/>}
          />
        )}
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
