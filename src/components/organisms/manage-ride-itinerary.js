import { StyleSheet, View } from 'react-native';

import Card from './templates/card';
import Text from '../atoms/text';
import Button from '../atoms/button';


export default ManageRideItinerary = props => {

    return (
        <Card >

            <View style={styles.contentWrapper}>

                <Text light title center size="md" value="Gerencie seu itinerário 📍" />

                <View style={styles.buttonsWrapper}>

                    <Button size="sm" onPress={props.removeLocation} value="Remover parada" />

                    <Button size="sm" onPress={props.addLocation} value="Adicionar parada" />

                </View>

                <View style={styles.buttonsWrapper}>

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
    buttonsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
});