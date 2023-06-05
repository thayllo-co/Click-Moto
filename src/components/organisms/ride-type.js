import { StyleSheet, View } from 'react-native';

import Window from './templates/window';
import IconButton from '../molecules/icon-button';
import packageIcon from '../../assets/images/package.png';
import passengerIcon from '../../assets/images/passenger.png';
import { RIDE_TYPE } from '../../utils/constants';


export default RideType = props => {

    const selectRideType = type => {
        props.nextAction(type);
        props.toggler();
    }

    return (
        <Window isVisible={props.isVisible} toggler={props.toggler} title="O que deseja transportar?" lines={2}>

            <View style={{ flexDirection: 'row', height: 150, justifyContent: 'space-around' }}>

                <IconButton size="md" source={packageIcon} label="Encomenda" light
                    onPress={() => selectRideType(RIDE_TYPE.PACKAGE)} />

                <IconButton size="md" source={passengerIcon} label="Passageiro" light
                    onPress={() => selectRideType(RIDE_TYPE.PASSENGER)} />

            </View>

        </Window>
    )
}

const styles = StyleSheet.create({
    contentWrapper: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 15,
        justifyContent: 'space-evenly'
    }
});