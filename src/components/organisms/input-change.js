import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Card from './templates/card';
import Text from '../atoms/text';
import InputForm from '../molecules/input-form';
import Button from '../atoms/button';


export default InputChange = props => {

    const [changeValue, setChangeValue] = useState(0);

    return (
        <Card >

            <View style={styles.contentWrapper}>

                <Text light title center bold size="xl" value="Precisa de troco?" />

                <Text light title center size="xs" value="Pagamento apenas em dinheiro." />

                <View style={styles.inputRow}>

                    <Text light title center size="xl" value="R$" />

                    <InputForm
                        placeholder="10"
                        keyboardType="numeric"
                        maxLength={6}
                        minLength={2}
                        getValue={setChangeValue}
                        center
                        size="sm"
                        masked
                        type={'custom'}
                        options={{ mask: '999.99' }} />

                </View>

                <View style={styles.buttonRow}>

                    <Button size="sm" onPress={() => props.nextAction('0')} value="Não precisa" />

                    <Button size="sm" onPress={() => props.nextAction(changeValue)} value="Salvar troco" />

                </View>

            </View>

        </Card>
    )
};


const styles = StyleSheet.create({
    contentWrapper: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    changeInput: {
        backgroundColor: 'blue',
        fontSize: 34,
        alignSelf: 'center'
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});