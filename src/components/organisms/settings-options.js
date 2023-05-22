import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Text from '../atoms/text';
import userPhoto from '../../assets/images/user-photo.png';
import Image from '../atoms/image';
import ConfirmationWindow from './confirmation-window';


export default SettingsOptions = props => {

    const [isLogoutConfirmationVisible, setIsLogoutConfirmationVisible] = useState(false);

    return (
        <View isLoading={props?.isLoading}>

            <Image source={props?.photoURL ? { uri: props?.photoURL } : userPhoto} style={styles.userPhoto} />

            <Text light title center size="lg" value={props?.name + " " + props?.surname} />

            <Text light title center size="xs" value={props?.email} />

            <Text light title center size="xs" value={props?.phoneNumber} />

            <Text danger title center size="xs" value="Sair"
                onPress={() => setIsLogoutConfirmationVisible(true)} />

            <ConfirmationWindow
                message="Deseja mesmo sair do Click Moto?"
                isVisible={isLogoutConfirmationVisible}
                confirm={props.disconnectUser}
                dismiss={() => setIsLogoutConfirmationVisible(false)} />

        </View>
    );
}

const styles = StyleSheet.create({
    propsPhoto: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginVertical: 12,
        borderRadius: 150,
        overflow: 'hidden',
    },
});