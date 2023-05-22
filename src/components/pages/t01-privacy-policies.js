import React from 'react';

import BackgroundDefault from '../templates/background-default';
import PolicyContent from '../organisms/policy-content';
import Header from '../molecules/header';


export default PrivacyPolicies = props => {
    return (
        <BackgroundDefault>

            <Header navigationBack navigation={props.navigation} header="Política de Privacidade" />

            <PolicyContent />

        </BackgroundDefault>
    );
}