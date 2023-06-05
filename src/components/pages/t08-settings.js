import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BackgroundDefault from './templates/background-default';
import Header from '../molecules/header';
import { disconnectUser } from '../../store/actions/user';
import SettingsOptions from '../organisms/settings-options';


export default Settings = props => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    return (
        <BackgroundDefault isLoading={user?.isLoading}>

            <Header navigationBack navigation={props.navigation} header="Configurações" />

            <SettingsOptions user={user} disconnectUser={() => dispatch(disconnectUser())} />

        </BackgroundDefault>
    );
};