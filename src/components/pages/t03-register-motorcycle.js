import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BackgroundDefault from '../templates/background-default';
import Header from '../molecules/header';
import MotorcycleForm from '../organisms/motorcycle-form';
import { uploadUserData } from '../../store/actions/user';


export default RegisterMotorcycle = props => {

    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.user?.isLoading);
    const uid = useSelector(state => state.user?.uid);

    const handleSubmitMotorcycle = motorcycle => {
        const isVerified = false;
        const isOnline = false;
        dispatch(uploadUserData(uid, { motorcycle, isVerified, isOnline }));
    }

    return (
        <BackgroundDefault isLoading={isLoading}>

            <Header center header="Cadastrar Motocicleta 🛵..." />

            <MotorcycleForm handleSubmitMotorcycle={handleSubmitMotorcycle} />

        </BackgroundDefault >
    );
}