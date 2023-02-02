import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import BackgroundDefault from '../templates/background-default';
import WelcomeDriver from '../organisms/welcome-driver';
import WelcomePassenger from '../organisms/welcome-passenger';
import Button from '../atoms/button';
import Image from '../atoms/image';
import logo from '../../assets/images/logo.png';
import { DRIVER_ROLE, PASSENGER_ROLE } from '../../utils/constants';


export default Welcome = props => {

    const [role, setRole] = useState(DRIVER_ROLE);

    return (
        <BackgroundDefault>

            <Header center header="BOAS VINDAS! 🎉" />

            <Image source={logo} style={styles.image} />

            {(role == PASSENGER_ROLE) && <WelcomePassenger />}

            {(role == DRIVER_ROLE) && <WelcomeDriver />}

            <Button size="lg" onPress={() => props.navigation.navigate('Home')}>Continuar</Button>

        </BackgroundDefault >
    );
}

const styles = StyleSheet.create({
    image: {
        height: 250,
        marginVertical: 20
    }
});
