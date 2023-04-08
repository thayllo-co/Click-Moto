import React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import BackgroundDefault from '../../templates/background-default';
import Text from '../../atoms/text';

export default VerificationInfo = props => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    return (
        <BackgroundDefault isLoading={user?.isLoading}>

            <Header navigationBack navigation={props.navigation} header="Ajuda e Instruções" />

            <Text light title center size="lg" value="Sobre os Documentos" />

            <Text light paragrath center size="lg" value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget malesuada dolor, a ultrices ante. Quisque in lobortis ex, ut cursus mi. Maecenas lorem est, rhoncus quis mollis sed, suscipit in nisl. Nullam non tellus feugiat, laoreet mauris non, venenatis purus. Vivamus hendrerit arcu in justo venenatis viverra a a diam. Phasellus sodales commodo mauris, sit amet vulputate sem volutpat non. Aenean non varius lorem." />

            <Text light title center size="lg" value="Como Enviar" />

            <Text light paragrath center size="lg" value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget malesuada dolor, a ultrices ante. Quisque in lobortis ex, ut cursus mi. Maecenas lorem est, rhoncus quis mollis sed, suscipit in nisl. Nullam non tellus feugiat, laoreet mauris non, venenatis purus. Vivamus hendrerit arcu in justo venenatis viverra a a diam. Phasellus sodales commodo mauris, sit amet vulputate sem volutpat non. Aenean non varius lorem." />

            <Text light title center size="lg" value="Mais Informações" />

            <Text light paragrath center size="lg" value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget malesuada dolor, a ultrices ante. Quisque in lobortis ex, ut cursus mi. Maecenas lorem est, rhoncus quis mollis sed, suscipit in nisl. Nullam non tellus feugiat, laoreet mauris non, venenatis purus. Vivamus hendrerit arcu in justo venenatis viverra a a diam. Phasellus sodales commodo mauris, sit amet vulputate sem volutpat non. Aenean non varius lorem." />

        </BackgroundDefault>
    );
}