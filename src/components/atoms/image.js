import React from 'react';
import { View, Image, StyleSheet } from 'react-native';


export default ImageView = props => (
    <View style={props.style}>

        <Image source={props.source} style={styles.image} />

    </View>
);

const styles = StyleSheet.create({
    image: {
        resizeMode: 'contain',
        alignSelf: 'center',
        height: '100%',
        width: '100%'
    }
});