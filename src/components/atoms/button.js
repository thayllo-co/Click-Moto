import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import colors from '../../theme/colors';
import { selectSizeHelper } from '../../utils/fuctions';


export default button = props => (
    <TouchableOpacity
        style={[
            styles.wrapper,
            (selectSizeHelper(props.size, styles.xs, styles.sm, styles.md, styles.lg, styles.xl)),
            (props.disabled ? styles.disabled : null),
            props.style]}
        onPress={props.onPress}
        disabled={props.disabled}>

        <Text style={styles.buttonText}>{props.value}</Text>

    </TouchableOpacity>
);

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        borderWidth: 1,
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 6,
        paddingTop: 6,
        margin: 6,
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center'
    },
    disabled: {
        backgroundColor: 'lightgray',
    },
    xs: {
        width: '20%'
    },
    sm: {
        width: '40%'
    },
    md: {
        width: '60%'
    },
    lg: {
        width: '80%'
    },
    xl: {
        width: '100%'
    }
});