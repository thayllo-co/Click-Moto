import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Text from '../atoms/text';
import Image from '../atoms/image';
import colors from '../../theme/colors';
import { convertTimestamtToDate } from '../../utils/fuctions';
import locListIcon from '../../assets/images/location-list.png';


export default RideListItem = props => (
    <TouchableOpacity style={styles.border}>

        <View style={styles.locationBlock}>
            {props?.ride?.itinerary?.length >= 2 &&
                props?.ride?.itinerary?.map((data, index) =>
                    <View key={index} style={styles.adressRow}>
                        <Image source={locListIcon} style={styles.icon} />
                        <Text paragraph light size="md" lines={1} value={data.title} />
                    </View>
                )
            }
        </View>

        <View style={styles.dataBlock}>
            <Text paragraph highlight size="md" lines={1} value={convertTimestamtToDate(props.ride.timestamp)} />
            <Text paragraph highlight size="md" lines={1} value={`R$ ${props.ride.ridePrice}`} />
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
        justifyContent: 'space-around',
        flexDirection: 'column',
        backgroundColor: colors.backgroundDefault
    }
});