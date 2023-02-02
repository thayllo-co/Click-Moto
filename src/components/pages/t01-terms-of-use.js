import React from 'react';

import BackgroundDefault from '../templates/background-default';
import TermsContent from '../organisms/terms-content';
import Header from '../molecules/header';


export default TermsOfUse = props => {
    return (
        <BackgroundDefault>

            <Header navigationBack navigation={props.navigation} header="Termos E Condições De Uso" />

            <TermsContent />

        </BackgroundDefault>
    );
}