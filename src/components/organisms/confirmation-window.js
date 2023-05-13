import { StyleSheet, View } from 'react-native';

import Button from '../atoms/button';
import Text from '../atoms/text';
import Window from './templates/window';


export default ConfirmationWindow = props => {

    return (
        <Window isVisible={props.isVisible} toggler={props.dismiss} title="Confirmação" lines={2}>

            <View style={styles.messageWrapper}>

                <Text light paragraph center size="xl" value={props.message} />

            </View>

            <View style={styles.buttonsRow}>

                <Button size="sm" onPress={props.dismiss} value="Cancelar" />

                <Button size="sm" onPress={props.confirm} value="Continuar" />

            </View>

        </Window>
    )
}

const styles = StyleSheet.create({
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginVertical: 12
    },
    messageWrapper: {
        paddingVertical: 22,
        paddingHorizontal: 18
    }
});