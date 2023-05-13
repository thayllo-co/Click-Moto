import { View, StyleSheet, TouchableOpacity } from 'react-native';

import Image from '../atoms/image';
import backArrow from '../../assets/images/back-arrow.png';
import Text from '../atoms/text';


export default Header = props => (
    <View style={styles.conteiner}>

        {props.navigationBack &&
            <TouchableOpacity onPress={() => props.navigation.goBack()}>

                <Image source={backArrow} style={styles.icon} />

            </TouchableOpacity>}

        {props.header &&
            <View style={[styles.header, (props.center ? styles.center : null)]}>

                <Text title highlight size="md" lines={1} value={props.header} />

            </View>}

    </View>
);

const styles = StyleSheet.create({
    conteiner: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12
    },
    icon: {
        width: 25,
        height: 25,
        marginHorizontal: 8,
    },
    header: {
        flex: 1
    },
    center: {
        alignItems: 'center'
    }
});