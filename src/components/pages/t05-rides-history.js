import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BackgroundDefault from '../templates/background-default';
import Header from '../molecules/header';
import { getAllRidesDetails } from '../../store/actions/ride';
import RidesList from '../organisms/rides-list';


export default RidesHistory = props => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllRidesDetails(user?.uid));
    }, []);

    return (
        <BackgroundDefault isLoading={user?.isLoading}>

            <Header navigationBack navigation={props.navigation} header="Histórico de Viagens" />

            <RidesList rides={user?.rides} />

        </BackgroundDefault>
    );
};