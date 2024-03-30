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
      formatIngredients(json.meals[0]);
      setRecipes(json.meals[0]);
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getRecipes();
  }, []);
  function formatIngredients(json) {
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
            <View style={[styles.flex1, styles.paddingH, styles.gap10]}>
              <Text style={styles.recipeName}>{recipes.strMeal}</Text>
              <View style={[styles.row, styles.gap10]}>
                <Text>{recipes.strArea}</Text>
                <Text>{recipes.strCategory}</Text>
              </View>
              <Text>{recipes.strTags}</Text>
              <Text style={styles.headers}>Ingedients</Text>
              <View style={styles.ingredientWrapper}>
                <View>
                  {ingredientAmount.map((prop, key) => {
                    return <Text key={key}>{prop}</Text>;
                  })}
                </View>
                <View>
                  {ingredientNames.map((prop, key) => {
                    return <Text key={key}>{prop}</Text>;
                  })}
                </View>
              </View>
              <Text style={styles.headers}>Instructions</Text>
              <Text>{recipes.strInstructions}</Text>
            </View>
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
    fontSize: 50,
  },
  headers: {
    fontWeight: "bold",
    fontSize: 30,
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
  paddingH: {
    paddingHorizontal: 10,
  },
  ingredientWrapper: {
    flexDirection: "row",
    gap: 20,
  },
  row: {
    flexDirection: "row",
  },
  gap10: {
    gap: 10,
  },
  test: {
    flex: 1,
    justifyContent: "center",
  },
});
