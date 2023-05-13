import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BackgroundDefault from '../../templates/background-default';
import Header from '../../molecules/header';
import EarnigsContent from '../../organisms/earnigs-content';
import { getAllRidesEarnings } from '../../../store/actions/ride';


export default Earnings = props => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllRidesEarnings(user?.uid));
    }, []);

    return (
        <BackgroundDefault isLoading={user?.isLoading}>

            <Header navigationBack center navigation={props.navigation} header="GANHOS 💰" />

            <EarnigsContent user={user} />

        </BackgroundDefault>
    );
}