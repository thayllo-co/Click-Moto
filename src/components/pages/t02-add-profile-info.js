import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BackgroundDefault from './templates/background-default';
import Header from '../molecules/header';
import ProfileInfoForm from '../organisms/profile-info-form';
import { uploadUserData } from '../../store/actions/user';
import { STATUS_OPTIONS } from '../../utils/constants';


export default AddProfileInfo = props => {

    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.user?.isLoading);
    const uid = useSelector(state => state.user?.uid);

    const handleSubmitData = info => {
        const rating = 5;
        const status = STATUS_OPTIONS.IDLE;
        dispatch(uploadUserData(uid, { ...info, rating, status }));
    }

    return (
        <BackgroundDefault isLoading={isLoading}>

            <Header center header="Olá! Vamos nos familiarizar!" />

            <ProfileInfoForm handleSubmitData={handleSubmitData} />

        </BackgroundDefault >
    );
};