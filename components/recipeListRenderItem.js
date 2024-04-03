import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, Image, Pressable, StyleSheet, View } from "react-native";

export default function RecipeListRenderItem({ data, navTarget, getRecipes }) {
  const navigation = useNavigation();
  return (
    <Pressable style={styles.listItemWrapper} onPress={() => navigation.navigate(navTarget, {data, getRecipes})}>
      <Image
        source={{ uri: data.strMealThumb + "/preview" }}
        style={{
          width: "30%",
          height: undefined,
          borderRadius: 10,
          aspectRatio: 1 / 1,
        }}
      />
      <View style={styles.descriptionWrapper}>
        <Text>{data.strMeal}</Text>
        <View style={styles.categoryWrapper}>
          <Text>{data.strCategory}</Text>
          <Text>{data.strArea}</Text>
        </View>
        <Text>{data.strTags}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  listItemWrapper: {
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#999",
    flexDirection: "row",
    gap: 10,
  },
  descriptionWrapper: {
    flexDirection: "column",
    gap: 3,
  },
  categoryWrapper: {
    flexDirection: "row",
    gap: 20,
  },
});
