import React from 'react';
import { KeyboardAvoidingView, SafeAreaView, StatusBar, StyleSheet, View, Platform } from 'react-native';

import colors from '../../theme/colors';
import LoadingIndicator from '../atoms/progress-indicator';


export default BackgroundDefault = props => (
    <SafeAreaView style={styles.maxConteiner}>

        <StatusBar barStyle="light-content" />

        {props.isLoading && <LoadingIndicator style={styles.loading} />}

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.maxConteiner} >

            <View style={[styles.content, props.style]}>

                {props.children}

            </View>

        </KeyboardAvoidingView>

    </SafeAreaView>
);

const styles = StyleSheet.create({
    maxConteiner: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.backgroundDefault
    },
    content: {
        flex: 1,
        margin: 8,
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