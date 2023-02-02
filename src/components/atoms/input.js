import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'


export default Input = props => {
    const [value, setValue] = useState('');
    const [isValueValid, setIsValueValid] = useState(true);

    onValueChange = value => {
        setValue(value);
        if (value.length >= props.minLength && value.length <= props.maxLength) {
            setIsValueValid(true);
            props?.getValue(value);
        } else {
            setIsValueValid(false);
            props?.getValue(null);
        }
    }

    return (
        <>
            {!props.masked &&
                <TextInput
                    {...props}
                    style={
                        [styles.input,
                        (isValueValid === false ? styles.invalid : null),
                        (props.center === true ? { textAlign: 'center' } : null)]
                    }
                    placeholderTextColor="gray"
                    value={value}
                    onChangeText={onValueChange}
                />
            }

            {props.masked &&
                <TextInputMask
                    {...props}
                    style={
                        [styles.input,
                        (isValueValid === false ? styles.invalid : null),
                        (props.center === true ? { textAlign: 'center' } : null)]
                    }
                    placeholderTextColor="gray"
                    value={value}
                    onChangeText={onValueChange}
                />
            }
        </>
    )
};

const styles = StyleSheet.create({
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
});