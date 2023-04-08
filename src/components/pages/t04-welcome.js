import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import BackgroundDefault from '../templates/background-default';
import Image from '../atoms/image';
import logo from '../../assets/images/logo.png';
import WelcomeDriver from '../organisms/welcome-driver';
import WelcomePassenger from '../organisms/welcome-passenger';
import WelcomeAdimin from '../organisms/welcome-admin';
import Button from '../atoms/button';
import { ADMIN_ROLE, DRIVER_ROLE, PASSENGER_ROLE } from '../../utils/constants';
import Header from '../molecules/header';


export default Welcome = props => {

    const role = useSelector(state => state.user?.role);

    return (
        <BackgroundDefault>

            <Header center header="BOAS VINDAS! 🎉" />

            <Image source={logo} style={styles.image} />

            {(role == PASSENGER_ROLE) && <WelcomePassenger />}

            {(role == DRIVER_ROLE) && <WelcomeDriver navigation={props.navigation} />}

            {(role == ADMIN_ROLE) && <WelcomeAdimin />}

            <Button size="lg" onPress={() => props.navigation.navigate('Home')} value="Continuar" />

        </BackgroundDefault >
    );
}

const styles = StyleSheet.create({
    image: {
        height: 250,
        marginVertical: 50
    }
});
