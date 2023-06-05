import { StyleSheet, View } from 'react-native';

import Window from './templates/window';
import Image from '../atoms/image';
import Text from '../atoms/text';
import Button from '../atoms/button';
import packageIcon from '../../assets/images/package.png';
import passengerIcon from '../../assets/images/passenger.png';

export default NewRide = props => {

    return (
        <Window isVisible={props.isVisible} toggler={props.toggler} title="NOVA CORRIDA 🛵✨">

            <View style={styles.contentWrapper}>

                <Image source={props.ride?.rideType == "package" ? packageIcon : passengerIcon} style={styles.rideTypeIcon} />

                <View>

                    <Text light paragraph size="xl" value={"📍 " + props.ride?.rideDistance + " km"} />

                    <Text light paragraph size="xl" value={"⏱ " + props.ride?.rideTime + " min"} />

                    <Text light paragraph size="xl" value={"💰 R$ " + props.ride?.ridePrice} />

                    <Text light paragraph size="xl" value={"👛 R$ " + props.ride?.changeValue} />

                </View>

            </View>

            <View style={styles.buttonsRow}>

                <Button size="sm" onPress={props.toggler} value="Recusar" />

                <Button size="sm" onPress={() => { props.sendRideAcceptance(); props.toggler(); }} value="Aceitar" />

            </View>

        </Window>
    )
}

const styles = StyleSheet.create({
    contentWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 12
    },
    rideTypeIcon: {
        width: 100,
        height: 100
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginVertical: 12
    }
});