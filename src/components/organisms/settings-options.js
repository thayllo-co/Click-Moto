import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Image from '../atoms/image';
import Text from '../atoms/text';
import Button from '../atoms/button';
import ConfirmationWindow from './confirmation-window';
import userPhoto from '../../assets/images/user-photo.png';
import { USER_ROLE } from '../../utils/constants';


export default SettingsOptions = props => {

    const [isLogoutConfirmationVisible, setIsLogoutConfirmationVisible] = useState(false);

    return (
        <View>

            <Image source={props?.user?.photoURL ? { uri: props?.user?.photoURL } : userPhoto} style={styles.userPhoto} />

            <Text light title center size="lg" value={props?.user?.name + " " + props?.user?.surname} />

            <Text light title center size="xs" value={props?.user?.email} />

            <Text light title center size="xs" value={props?.user?.phoneNumber} />

            <Button size="lg" onPress={props.changeRole} value={`Trocar para ${props?.user?.role === USER_ROLE.PASSENGER ? "Motorista" : "Passageiro"}`} />

            <Button size="lg" onPress={props.sendLogs} value="Enviar Relatórios do App" />

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