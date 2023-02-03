import React from 'react';
import { useDispatch } from 'react-redux';

import BackgroundDefault from '../templates/background-default';
import Header from '../molecules/header';
import MotorcycleForm from '../organisms/motorcycle-form';
import { ToastMessage, TYPE } from '../atoms/toast-message';
import { userUpdate } from '../../store/actions/user';


export default RegisterMotorcycle = props => {

    const dispatch = useDispatch();

    const handleSubmit = motorcycle => {
        ToastMessage("RegisterMotorcycle - handleSubmit", TYPE.SUCCESS);
        dispatch(userUpdate({motorcycle}));
    }

    return (
        <BackgroundDefault>

            <Header center header="Cadastrar Motocicleta 🛵..." />

            <MotorcycleForm submit={handleSubmit} />

        </BackgroundDefault >
    );
}