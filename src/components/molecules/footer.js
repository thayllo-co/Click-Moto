import { StyleSheet, View } from 'react-native';

import Text from '../atoms/text';


export default Footer = props => {
    return (
        <View style={styles.bottomContent}>

            <View style={styles.bottomRowWrapper}>

                <Text paragraph light center size="sm" value="Ao continuar você concorda com os " />

                <Text paragraph highlight center link size="sm" value="Termos de Uso" onPress={() => props.navigation.navigate('TermsOfUse')} />

                <Text paragraph light center size="sm" value=" e a " />

                <Text paragraph highlight center link size="sm" value="Política de Privacidade" onPress={() => props.navigation.navigate('PrivacyPolicies')} />

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    bottomRowWrapper: {
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
});