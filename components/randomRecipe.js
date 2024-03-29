import * as React from "react";
import { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Pressable,
  Text,
  View,
  ScrollView,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RandomRecipe() {
  const [recipes, setRecipes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [ingredientNames, setIngredientNames] = useState([]);
  const [ingredientAmount, setIngredientAmount] = useState([]);
  const getRecipes = async () => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const json = await response.json();
      await formatIngredients(json.meals[0]);
      setRecipes(json.meals[0]);
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getRecipes();
  }, []);
  async function formatIngredients(json) {
    const nameArray = [];
    const amountArray = [];
    for (i = 1; i <= 20; i++) {
      let nameString = `strIngredient` + i;
      let amountString = `strMeasure` + i;
      if (!json[nameString]) {
        break;
      }
      nameArray.push(json[nameString]);
      amountArray.push(json[amountString]);
    }
    setIngredientNames([...ingredientNames, ...nameArray]);
    setIngredientAmount([...ingredientAmount, ...amountArray]);
  }
  if (!isLoaded) {
    return (
      <View style={styles.flex1}>
        <View style={styles.test}>
          <ActivityIndicator size={"large"} />
        </View>
        <Pressable style={styles.bottomContainer}>
          <Text>Save recipe</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <React.Fragment>
      {recipes && (
        <SafeAreaView style={styles.flex1}>
          <ScrollView style={styles.flex1}>
            <Image
              source={{ uri: recipes.strMealThumb }}
              style={{ width: "100%", height: undefined, aspectRatio: 3 / 2 }}
              defaultSource={require("../assets/icon.png")}
            />
            <Text style={styles.recipeName}>{recipes.strMeal}</Text>
            {ingredientNames.map((prop, key) => {
              return <Text key={key}>{prop}</Text>;
            })}
            {ingredientAmount.map((prop, key) => {
              return <Text key={key}>{prop}</Text>;
            })}
            <Text>{recipes.strInstructions}</Text>
          </ScrollView>
          <Pressable
            style={styles.bottomContainer}
            onPress={() => {
              getRecipes();
              setIsLoaded(false);
            }}
          >
            <Text>Save recipe</Text>
          </Pressable>
        </SafeAreaView>
      )}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  recipeName: {
    fontWeight: "bold",
    fontSize: 30,
    paddingHorizontal: 10,
  },
  bottomContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "green",
    padding: 10,
  },
  flex1: {
    flex: 1,
  },
  test: {
    flex: 1,
    justifyContent: "center",
  },
});
