import * as React from 'react'
import { Text, Image } from "react-native"

export default function RecipeListRenderItem({data}) {
    return(
        <React.Fragment>
            <Text>{data.strMeal}</Text>
            <Image
                source={{uri: data.strMealThumb}}
                style={{width: '30%', height: undefined, borderRadius: 10, aspectRatio: 1/1}}
            />
        </React.Fragment>
    )
}