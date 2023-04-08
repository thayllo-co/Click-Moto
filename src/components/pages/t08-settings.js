import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import BackgroundDefault from '../templates/background-default';
import Text from '../atoms/text';
import Header from '../molecules/header';
import userPhoto from '../../assets/images/user-photo.png';
import Image from '../atoms/image';
import { disconnectUser } from '../../store/actions/user';
import ConfirmationWindow from '../templates/confirmation-window';

export default Settings = props => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const [isLogoutConfirmationVisible, setIsLogoutConfirmationVisible] = useState(false);

    return (
        <BackgroundDefault isLoading={user?.isLoading}>

            <Header navigationBack navigation={props.navigation} header="Configurações" />

            <Image source={user?.photoURL ? { uri: user?.photoURL } : userPhoto} style={styles.userPhoto} />

            <Text light title center size="lg" value={user?.name + " " + user?.surname} />

            <Text light title center size="xs" value={user?.email} />

            <Text light title center size="xs" value={user?.phoneNumber} />

            <Text danger title center size="xs" value="Sair"
                onPress={() => setIsLogoutConfirmationVisible(!isLogoutConfirmationVisible)} />

            <ConfirmationWindow
                message="Deseja mesmo sair do Click Moto?"
                isVisible={isLogoutConfirmationVisible}
                confirm={() => dispatch(disconnectUser())}
                dismiss={() => setIsLogoutConfirmationVisible(!isLogoutConfirmationVisible)} />

        </BackgroundDefault>
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