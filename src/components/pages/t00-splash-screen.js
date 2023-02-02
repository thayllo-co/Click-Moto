import React from 'react';
import { StyleSheet } from 'react-native';

import BackgroundDefault from '../templates/background-default';
import ImageView from '../atoms/image';
import logo from '../../assets/images/logo.png';
import LoadingIndicator from '../atoms/progress-indicator';


export default SplashScreen = () => (
    <BackgroundDefault>

        <ImageView source={logo} style={styles.image} />

        <LoadingIndicator style={styles.loading} />

    </BackgroundDefault>
);

const styles = StyleSheet.create({
    image: {
        height: 400,
        marginTop: 100
    },
    loading: {
        alignSelf: 'center',
        marginTop: 50
    }
});