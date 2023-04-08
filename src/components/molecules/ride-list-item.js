import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';
// import { styls } from '../styles';
// import { convertTimestamtToDate } from '../utilities/functions';

export default RideListItem = props => (
    <TouchableOpacity
        style={styles.border}
        // onPress={() => props.navigation.navigate('T29_ViagemRealizada')}
        >

        <View style={styles.locationBlock}>
            <View style={styles.adressRow}>
                {/* <Image source={require('../img/location.png')} style={styles.icon} /> */}
                {/* <Text numberOfLines={1} style={[styls.p4, { textAlign: 'left' }]}>{props.ride.itinerary[0].title}</Text> */}
            </View>
            <View style={styles.adressRow}>
                {/* <Image source={require('../img/arrival.png')} style={styles.icon} /> */}
                {/* <Text numberOfLines={1} style={[styls.p4, { textAlign: 'left' }]}>{props.ride.itinerary[props.ride.itinerary.length - 1].title}</Text> */}
            </View>
        </View>

        <View style={styles.dataBlock}>
            {/* <Text style={[styls.p4, { flex: 1 }]}>{convertTimestamtToDate(props.ride.timestamp)}</Text> */}
            {/* <Text style={[styls.p3, { flex: 1 }]}>R$ {props.ride.rideValue}</Text> */}
        </View>

    </TouchableOpacity>
);

const styles = StyleSheet.create({
    border: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "white",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    locationBlock: {
        flex: 2,
        alignItems: 'center',
        alignItems: 'flex-start'
    },
    adressRow: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    icon: {
        width: 20,
        height: 20,
        alignSelf: 'center',
        margin: 5
    },
    dataBlock: {
        flex: 1,
        alignItems: 'flex-end',
        alignContent: 'space-between',
        flexDirection: 'column',
        height: '100%'
    }
});