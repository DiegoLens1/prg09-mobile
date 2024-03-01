import * as React from 'react'
import { Text, Image, Pressable, StyleSheet } from "react-native"

export default function RecipeListRenderItem({data}) {
    return(
        <Pressable style={styles.listItemWrapper}>
            <Image
                source={{uri: data.strMealThumb}}
                style={{width: '30%', height: undefined, borderRadius: 10, aspectRatio: 1/1}}
            />
            <Text>{data.strMeal}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    listItemWrapper: {
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#999",
        flexDirection: "row",
        gap: 10
    }
  });
  