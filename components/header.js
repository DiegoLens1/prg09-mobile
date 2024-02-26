import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Header ({name}) {
    return(
            <SafeAreaView style={styles.headerContainer}>
                <Text style={styles.headerText}>{name}</Text>
            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#444',
        height: 100
    },
    headerText: {
        fontSize: 30
    }
  });
  