import React from 'react';
import { StyleSheet, View } from 'react-native';

import Input from '../atoms/input';
import { selectSizeHelper } from '../../utils/fuctions';
import Text from '../atoms/text';


export default InputForm = props => {
    return (
        <View style={[styles.inputWrapper,
        selectSizeHelper(props.size, styles.xs, styles.sm, styles.md, styles.lg, styles.xl)]}>

            {props.label &&
                <Text paragraph light size="sm" value={props.label} />}

            <Input  {...props} />

        </View>
    )
};

const styles = StyleSheet.create({
    inputWrapper: {
        padding: 4
    },
    input: {
        backgroundColor: '#ffffff',
        borderColor: '#bfbbbb',
        borderRadius: 6,
        borderWidth: 2,
        fontSize: 20,
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 6,
        paddingTop: 6,
        textAlignVertical: 'top',
        color: 'black'
    },
    invalid: {
        borderColor: 'red',
        borderWidth: 2
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