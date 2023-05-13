import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BackgroundDefault from '../../templates/background-default';
import VerificationContent from '../../organisms/verification-content';


export default VerificationInfo = props => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    return (
        <BackgroundDefault isLoading={user?.isLoading}>

            <Header navigationBack navigation={props.navigation} header="Ajuda e Instruções" />

            <VerificationContent />

        </BackgroundDefault>
    );
};