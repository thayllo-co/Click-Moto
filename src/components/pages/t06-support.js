import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import BackgroundDefault from '../templates/background-default';
import Text from '../atoms/text';
import Header from '../molecules/header';
import { upploadUserLogs } from '../../store/actions/user';

export default Support = props => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    return (
        <BackgroundDefault isLoading={user?.isLoading}>

            <Header navigationBack navigation={props.navigation} header="Central de Ajuda" />

            <View style={styles.optionsList}>

                <Text light title center size="md"
                    value="Entre em Contato"
                    onPress={() => props.navigation.navigate('SendMessage')} />

                <Text light title center size="md"
                    value="Termos de Uso"
                    onPress={() => props.navigation.navigate('TermsOfUse')} />

                <Text light title center size="md"
                    value="Políticas de Privacidade"
                    onPress={() => props.navigation.navigate('PrivacyPolicies')} />

                <Text light title center size="md"
                    value="Enviar Relatórios do App"
                    onPress={() => dispatch(upploadUserLogs(user?.uid))} />

            </View>

        </BackgroundDefault>
    );
}

const styles = StyleSheet.create({
    optionsList: {
        height: 250,
        justifyContent: 'space-evenly'
    }
});