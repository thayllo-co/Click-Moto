import { StyleSheet, View } from 'react-native';

import Card from '../templates/card';
import Text from '../atoms/text';
import Button from '../atoms/button';


export default ConfirmPickupLocation = props => {

    return (
        <Card >

            <View style={styles.contentWrapper}>

                <Text light title center bold size="xl" value="CONFIRMAÇÃO" />

                <Text light title center size="md" value="Mova o mapa para alterar o local de partida" />

                <View style={styles.buttonRow}>

                    <Button size="sm" onPress={props.backAction} value="Cancelar" />

                    <Button size="sm" onPress={props.nextAction} value="Confirmar" />

                </View>

            </View>

        </Card>
    )
};


const styles = StyleSheet.create({
    contentWrapper: {
        flex: 1,
        justifyContent: 'space-between'
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});