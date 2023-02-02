import React from 'react';

import BackgroundDefault from '../templates/background-default';
import Header from '../molecules/header';
import MotorcycleForm from '../organisms/motorcycle-form';
import { ToastMessage, TYPE } from '../atoms/toast-message';


export default RegisterMotorcycle = props => {

    const handleSubmit = motorcycle => {
        ToastMessage("RegisterMotorcycle - handleSubmit", TYPE.SUCCESS);
        console.log("RegisterMotorcycle - handleSubmit: ", motorcycle);
        props.navigation.navigate('Welcome');
    }

    return (
        <BackgroundDefault>

            <Header center header="Cadastrar Motocicleta 🛵..." />

            <MotorcycleForm submit={handleSubmit} />

        </BackgroundDefault >
    );
}