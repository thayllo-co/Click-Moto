import { StyleSheet, View } from 'react-native';

import Text from '../atoms/text';


export default SupportOptions = props => {

    return (
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
                onPress={props.sendLogs} />

        </View>
    );
};

const styles = StyleSheet.create({
    optionsList: {
        height: 250,
        justifyContent: 'space-evenly'
    }
});