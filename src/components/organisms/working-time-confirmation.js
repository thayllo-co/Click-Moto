import { StyleSheet, View } from 'react-native';

import Button from '../atoms/button';
import Text from '../atoms/text';
import Window from '../templates/window';


export default WorkingTimeConfirmation = props => {

    return (
        <Window isVisible={props.isVisible} toggler={props.toggler} title={props.confirmationHeading} lines={2}>

            <Text light title center size="md" value={props.confirmationMessage} />

            <View style={styles.buttonsRow}>

                <Button size="sm" onPress={props.toggler} value="Cancelar" />

                <Button size="sm" onPress={() => { props.toggleWorkingTime(); props.toggler(); }} value="Continuar" />

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
    }
});