import React from 'react';

import BackgroundDefault from '../templates/background-default';
import Header from '../molecules/header';
import ProfileInfoForm from '../organisms/profile-info-form';
import { ToastMessage, TYPE } from '../atoms/toast-message';


export default AddProfileInfo = props => {

    const handleSubmit = info => {
        ToastMessage("AddProfileInfo - handleSubmit", TYPE.SUCCESS);
        console.log("AddProfileInfo - handleSubmit: ", info);
        props.navigation.navigate('RegisterMotorcycle')
    }

    return (
        <BackgroundDefault>

            <Header center header="Olá! Vamos nos familiarizar!" />

            <ProfileInfoForm submit={handleSubmit} />

        </BackgroundDefault >
    );
}