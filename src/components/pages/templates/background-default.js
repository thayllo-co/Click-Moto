import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import colors from '../../../theme/colors';
import LoadingIndicator from '../../atoms/progress-indicator';


export default BackgroundDefault = props => (
    <SafeAreaView style={styles.maxConteiner}>

        <StatusBar barStyle="light-content" />

        {props.isLoading && <LoadingIndicator style={styles.loading} />}

        <KeyboardAwareScrollView style={styles.maxConteiner} >

            <View>

                {props.children}

            </View>

        </KeyboardAwareScrollView>

    </SafeAreaView>
);

const styles = StyleSheet.create({
    maxConteiner: {
        flex: 1,
        backgroundColor: colors.backgroundDefault
    },
    loading: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0, left: 0,
        zIndex: 9999,
        backgroundColor: colors.loadingLayer,
        justifyContent: 'center'
    }
});