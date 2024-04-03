import * as React from "react";
import { useState, useEffect, useContext } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Svg, Path } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { LogBox } from "react-native";

LogBox.ignoreLogs([ 'Non-serializable values were found in the navigation state', ]);

export default function SavedRecipe({ route, getRecipes }) {
  const data = route.params.data;
  const navigation = useNavigation()
  const [ingredientNames, setIngredientNames] = useState([]);
  const [ingredientAmount, setIngredientAmount] = useState([]);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    formatIngredients(data);
    checkStorage();
  }, []);
  function formatIngredients(json) {
    //Loops through ingredients in json and puts them in state for easy use.
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

  const saveRecipe = async () => {
    try {
      //saves the recipe to local storage with recipe id as key.
      const json = JSON.stringify(data);
      await AsyncStorage.setItem(data.idMeal, json);
      setSaved(true);
    } catch (e) {
      console.log("bruh");
    }
    console.log(e);
  };

  const checkStorage = async () => {
    if (!data.idMeal) {
      return;
    }
    try {
      //checks if current recipe is present in local storage.
      const json = await AsyncStorage.getItem(data.idMeal);
      if (json !== null) {
        setSaved(true);
      } else {
        setSaved(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeSavedRecipe = async () => {
    try {
      //deletes current recipe from local storage.
      await AsyncStorage.removeItem(data.idMeal);
      setSaved(false);
      route.params.getRecipes()
      navigation.goBack()
    } catch (e) {
      console.log(e);
    }
    console.log("removed");
  };
  return (
    <React.Fragment>
      <SafeAreaView style={styles.flex1}>
        <ScrollView style={styles.flex1}>
          <Image
            source={{ uri: data.strMealThumb }}
            style={{ width: "100%", height: undefined, aspectRatio: 3 / 2 }}
            defaultSource={require("../assets/icon.png")}
          />
          <View style={[styles.flex1, styles.paddingH, styles.gap10]}>
            <Text style={styles.recipeName}>{data.strMeal}</Text>
            <View style={[styles.row, styles.gap10]}>
              <Text>{data.strArea}</Text>
              <Text>{data.strCategory}</Text>
            </View>
            <Text>{data.strTags}</Text>
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
            <Text>{data.strInstructions}</Text>
          </View>
        </ScrollView>
        {
          /* turnary to show favorite/unfavorite button based on state */
          !saved ? (
            <Pressable
              style={styles.favButton}
              onPress={() => {
                saveRecipe();
              }}
            >
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 -960 960 960"
              >
                <Path d="M480-170q-13 0-25.5-4.5T431-189l-59-54q-109-97-192.5-189.5T96-634q0-88.018 59.85-147.009Q215.7-840 305-840q51.197 0 96.599 21.5Q447-797 480-757q35-40 79.66-61.5t95.02-21.5Q744-840 804-781.009T864-634q0 109-83.5 201.5T588-243l-59 54q-11 10-23.5 14.5T480-170Zm-34-512q-24-41-60-63.5T305-768q-58.714 0-97.857 38T168-633.607Q168-583 204-527t86 109.5Q340-364 393-318t87 76q34-30 87-76t103-99.5Q720-471 756-527t36-106.607Q792-692 752.857-730T655-768q-45 0-81.5 22.5T513-682q-5 10-14.048 14.5-9.047 4.5-19 4.5-9.952 0-19.452-4.5Q451-672 446-682Zm34 177Z" />
              </Svg>
            </Pressable>
          ) : (
            <Pressable
              style={styles.favButton}
              onPress={() => {
                removeSavedRecipe();
              }}
            >
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 -960 960 960"
                fill={"#d00"}
              >
                <Path d="M480-170q-13 0-25.5-4.5T431-189l-59-54q-109-97-192.5-189.5T96-634q0-88 60-147t149-59q51 0 96.5 21.5T480-757q35-40 79.5-61.5T655-840q89 0 149 59t60 147q0 109-83.5 201.5T588-243l-59 54q-11 10-23.5 14.5T480-170Z" />
              </Svg>
            </Pressable>
          )
        }
      </SafeAreaView>
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
  favButton: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "lightgray",
    borderRadius: 50,
    height: 50,
    width: 50,
  },
});
