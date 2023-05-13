import React from 'react';
import { useSelector } from 'react-redux';

import BackgroundDefault from '../templates/background-default';
import Header from '../molecules/header';
import WelcomeUser from '../organisms/welcome-user';


export default Welcome = props => {

    const role = useSelector(state => state.user?.role);

    return (
        <BackgroundDefault>

            <Header center header="BOAS VINDAS! 🎉" />

            <WelcomeUser role={role} navigation={props.navigation} />

        </BackgroundDefault >
    );
};