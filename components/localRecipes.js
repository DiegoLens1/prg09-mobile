import * as React from "react";
import { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RecipeListRenderItem from "./recipeListRenderItem";

export default function LocalRecipes() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?f=a"
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
          // <Text>{recipes.meals[1].strMeal}</Text>
          <FlatList
            data={recipes.meals}
            renderItem={({ item }) => <RecipeListRenderItem data={item} />}
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
