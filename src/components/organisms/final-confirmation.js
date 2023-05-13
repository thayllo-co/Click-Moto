import { StyleSheet, View } from 'react-native';

import Card from './templates/card';
import Text from '../atoms/text';
import Button from '../atoms/button';
import { RIDE_TYPE } from '../../utils/constants';


export default FinalConfirmation = props => {

    return (
        <Card >

            <View style={styles.contentWrapper}>

                <Text light title center bold size="xl" value="CONFIRMAÇÃO FINAL" />

                <Text light title center size="sm" value={props.ride.rideType == RIDE_TYPE.PASSENGER ? "Passageiro" : "Encomenda"} />

                {props.ride.itinerary.map((element, index) => {
                    return <Text light title center size="sm" value={"📍" + element.title} key={index} />
                })}

                <Text light title center size="sm" value={"💸 R$ " + props.ride.ridePrice + "  |  👛 R$ " + props.ride.changeValue} />

                <Text light title center size="sm" value={"⏱️ " + props.ride.rideTime + " min  |  🏍️ " + props.ride.rideDistance + " km"} />

                {props.noOnlineDrivers &&
                    <Text paragraph center danger bold size="md" value={"NÃO HÁ MOTORISTAS DISPONÍVEIS\nTente novamente mais tarde"} />}

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