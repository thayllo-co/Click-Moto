import { StyleSheet, View } from 'react-native';

import Card from './templates/card';
import Text from '../atoms/text';
import Button from '../atoms/button';


export default RidePrice = props => {

    return (
        <Card >

            <View style={styles.contentWrapper}>

                <Text light title center size="md" value="Valor estimado da viagem:" />

                <Text light title center bold size="xl" value={"R$ " + (props.value || 0)} />

                <View style={styles.buttonRow}>

                    <Button size="sm" onPress={props.backAction} value="Cancelar" />

                    <Button size="sm" onPress={props.nextAction} value="Continuar" />

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