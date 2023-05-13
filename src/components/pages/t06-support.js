import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BackgroundDefault from '../templates/background-default';
import Header from '../molecules/header';
import { upploadUserLogs } from '../../store/actions/user';
import SupportOptions from '../organisms/support-options';


export default Support = props => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    return (
        <BackgroundDefault isLoading={user?.isLoading}>

            <Header navigationBack navigation={props.navigation} header="Central de Ajuda" />

            <SupportOptions navigation={props.navigation} sendLogs={() => dispatch(upploadUserLogs(user?.uid))} />

        </BackgroundDefault>
    );
};