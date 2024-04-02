import * as React from "react";
import { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Pressable,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RandomRecipe() {
  const [recipes, setRecipes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [ingredientNames, setIngredientNames] = useState([]);
  const [ingredientAmount, setIngredientAmount] = useState([]);
  const [saved, setSaved] = useState([]);
  const getRecipes = async () => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const json = await response.json();
      formatIngredients(json.meals[0]);
      setRecipes(json.meals[0]);
      checkStorage();
      setIsLoaded(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const saveRecipe = async () => {
    try {
      const json = JSON.stringify(recipes);
      await AsyncStorage.setItem(recipes.idMeal, json);
      setSaved(true)
    } catch (e) {
      console.log("bruh");
    }
    console.log("saved");
  };

  const checkStorage = async () => {
    if (!recipes.idMeal){
      return
    }
    try {
      const json = await AsyncStorage.getItem(recipes.idMeal);
      if (json !== null) {
        setSaved(true);
      } else {
        setSaved(false);
      }
    } catch (e) {
      console.log("bruh");
    }
  };

  const removeSavedRecipe = async () => {
    try {
      await AsyncStorage.removeItem(recipes.idMeal);
      setSaved(false)
    } catch (e) {
      console.log("bruh");
    }
    console.log("removed");
  };

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
    setIngredientNames([...nameArray]);
    setIngredientAmount([...amountArray]);
  }

  // if (!isLoaded) {
  //   return (
  //     <View style={styles.flex1}>
  //       <View style={styles.test}>
  //         <ActivityIndicator size={"large"} />
  //       </View>
  //     </View>
  //   );
  // }

  return (
    <React.Fragment>
      {recipes && (
        <SafeAreaView style={styles.flex1}>
          <ScrollView style={styles.flex1} refreshControl={<RefreshControl refreshing={isLoaded} onRefresh={getRecipes}/>}>
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
          {!saved ? (
            <Pressable
              style={styles.bottomContainer}
              onPress={() => {
                saveRecipe();
              }}
            >
              <Text>Save recipe</Text>
            </Pressable>
          ) : (
            <Pressable
              style={styles.bottomContainer}
              onPress={() => {
                removeSavedRecipe()
              }}
            >
              <Text>Remove recipe</Text>
            </Pressable>
          )}
        </SafeAreaView>
      )}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  recipeName: {
    fontWeight: "bold",
    fontSize: 30,
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
