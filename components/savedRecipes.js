import * as React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import RecipeListRenderItem from "./recipeListRenderItem";
import { useNavigation } from "@react-navigation/native";

export default function SavedRecipes({navigation}) {
  const [recipes, setRecipes] = useState([]);
  const getRecipes = async () => {
    try {
      //Get all keys from localstorage.
      const keys = await AsyncStorage.getAllKeys();
      //Get all key value pairs based on given keys.
      const storageValues = await AsyncStorage.multiGet(keys);
      //Parse stringified json.
      const values = storageValues.map((val) => JSON.parse(val[1]));
      setRecipes(values);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getRecipes();
  }, []);

  useEffect(() => {
    //re renders recipes when tab is focused
    const unsubscribe = navigation.addListener('focus', () => {
      getRecipes()
    })
    return unsubscribe
  }, [navigation])
  return (
    <React.Fragment>
      <View style={styles.mainContainer}>
        <FlatList
          data={recipes}
          renderItem={({ item }) => (
            <RecipeListRenderItem data={item} navTarget={"Saved recipe"} getRecipes={getRecipes}/>
          )}
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
