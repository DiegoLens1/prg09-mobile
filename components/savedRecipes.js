import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from './header'

export default function SavedRecipes () {
    return(
        <React.Fragment>
            <Header name="Saved Recipes"/>
            <View style={styles.mainContainer}>
                <Text>Saved recipes</Text>
            </View>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }
  });
  