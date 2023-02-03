import React from 'react';
import { useDispatch } from 'react-redux';

import BackgroundDefault from '../templates/background-default';
import Header from '../molecules/header';
import ProfileInfoForm from '../organisms/profile-info-form';
import { ToastMessage, TYPE } from '../atoms/toast-message';
import { userUpdate } from '../../store/actions/user';


export default AddProfileInfo = props => {

    const dispatch = useDispatch();

    const handleSubmit = info => {
        ToastMessage("AddProfileInfo - handleSubmit", TYPE.SUCCESS);
        dispatch(userUpdate(info));
    }

    return (
        <BackgroundDefault>

            <Header center header="Olá! Vamos nos familiarizar!" />

            <ProfileInfoForm submit={handleSubmit} />

        </BackgroundDefault >
    );
}