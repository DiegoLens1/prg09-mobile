import * as React from "react";
import { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LocalRecipe({ route }) {
  const data = route.params.data;
  const [ingredientNames, setIngredientNames] = useState([]);
  const [ingredientAmount, setIngredientAmount] = useState([]);
  useEffect(() => {
    formatIngredients(data)
  }, [])
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
  });
  