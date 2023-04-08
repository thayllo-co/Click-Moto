import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Card from '../templates/card';
import Image from '../atoms/image';
import Text from '../atoms/text';
import IconButton from '../molecules/icon-button';
import userPhoto from '../../assets/images/user-photo.png';
import tipsIcon from '../../assets/images/trips.png';
import settingsIcon from '../../assets/images/settings.png';
import helpIcon from '../../assets/images/help.png';


export default Menu = props => {

    return (

        <Card position="top">

            <Image source={props.photoURL ? { uri: props.photoURL } : userPhoto} style={styles.userPhoto} />

            <View style={styles.nameRow}>

                <Text light title center size="sm" value={props.name ? props.name : "Seu Nome "} />

                <Text light title center size="sm" value={" - ⭐️" + (props.rating || 0).toFixed(1)} />

            </View>

            <View style={styles.menuOptionsWrapper}>

                <IconButton light label="Viagens" size="md" source={tipsIcon}
                    onPress={() => { props.dismiss(); props.navigation.navigate('RidesHistory'); }} />

                <IconButton light label="Ajuda" size="md" source={helpIcon}
                    onPress={() => { props.dismiss(); props.navigation.navigate('Support'); }} />

                <IconButton light label="Ajustes" size="md" source={settingsIcon}
                    onPress={() => { props.dismiss(); props.navigation.navigate('Settings'); }} />

            </View>

        </Card>
    )
};


const styles = StyleSheet.create({
    menuWrapper: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    userPhoto: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        marginTop: 25,
        borderRadius: 150,
        overflow: 'hidden',
    },
    nameRow: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    menuOptionsWrapper: {
        flexDirection: 'row',
        marginVertical: 15,
        justifyContent: 'space-around',
    },
});