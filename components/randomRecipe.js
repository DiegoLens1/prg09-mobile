import * as React from 'react';
import { useState, useEffect } from 'react'
import { Image, StyleSheet, Pressable, Text, View, ScrollView } from 'react-native';
import Header from './header';

export default function RandomRecipe () {
    const [recipes, setRecipes] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const getRecipes = async () => {
        try {
          const response = await fetch(
            'https://www.themealdb.com/api/json/v1/1/random.php',
          );
          const json = await response.json();
          setRecipes(json.meals[0])
          setIsLoaded(true)
        } catch (error) {
          console.error(error);
        }
      };
    useEffect(() => {
          getRecipes()
    }, [])
    if (!isLoaded) {
        return(
            <View style={styles.flex1}>
                <Header name="Random recipe"/>
                <Text style={[styles.flex1, styles.loading]}>Loading recipe...</Text>
                <Pressable 
                    style={styles.bottomContainer}>
                    <Text>Save recipe</Text>
                </Pressable>
            </View>
        )
    }
    return(
        <React.Fragment>
            <Header name="Random recipe"/>
            {recipes && (
                <View style={styles.flex1}>
                    <ScrollView style={styles.flex1}>
                        <Image
                            source={{uri: recipes.strMealThumb}}
                            style={{width: '100%', height: undefined, aspectRatio: 3/2}}
                        />
                        <Text style={styles.recipeName}>{recipes.strMeal}</Text>
                    </ScrollView>
                    <Pressable 
                        style={styles.bottomContainer}
                        onPress={() => {getRecipes(); setIsLoaded(false)}}>
                        <Text>Save recipe</Text>
                    </Pressable>
                </View>
            )}
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    recipeName: {
        fontWeight: "bold",
        fontSize: 30,
        paddingHorizontal: 10
    },
    bottomContainer: {
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "green",
        padding: 10
    },
    loading: {
        fontSize: 40
    },
    flex1: {
        flex: 1
    }
  });
