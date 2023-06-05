import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Text from '../atoms/text';
import userPhoto from '../../assets/images/user-photo.png';
import Image from '../atoms/image';
import ConfirmationWindow from './confirmation-window';


export default SettingsOptions = props => {

    const [isLogoutConfirmationVisible, setIsLogoutConfirmationVisible] = useState(false);

    return (
        <View>

            <Image source={props?.user?.photoURL ? { uri: props?.user?.photoURL } : userPhoto} style={styles.userPhoto} />

            <Text light title center size="lg" value={props?.user?.name + " " + props?.user?.surname} />

            <Text light title center size="xs" value={props?.user?.email} />

            <Text light title center size="xs" value={props?.user?.phoneNumber} />

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
    userPhoto: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginVertical: 12,
        borderRadius: 150,
        overflow: 'hidden',
    },
});