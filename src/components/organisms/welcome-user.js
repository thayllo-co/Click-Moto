import { StyleSheet, View } from 'react-native';

import Text from '../atoms/text';
import { USER_ROLE } from '../../utils/constants';
import Image from '../atoms/image';
import IconButton from '../molecules/icon-button';
import Button from '../atoms/button';


export default WelcomeUser = props => {
    return (
        <View style={styles.container}>

            <Image source={logo} style={styles.image} />

            {(role == USER_ROLE.PASSENGER) &&
                <Text title light center size="md" value="Obrigado pelo cadastro, entre e aproveite nossos serviços 🛵💨" />}

            {(props.role == USER_ROLE.DRIVER) &&
                <View>

                    <Text paragraph light center size="xl" value="Para completar seu cadastro e começar a receber as corridas precisamos que faça o envio de todos os documentos solicitados." />

                    <IconButton filled dark source={attach} size="sm" label="Documentos" onPress={() => props.navigation.navigate('VerificationInfo')} />

                </View>}

            {(props.role == USER_ROLE.ADMIN) &&
                <Text title light center size="sm" value="Antes de começar a usar o aplicativo como administrador, entre em contato com seu desenvolvedor para permitir seu acesso." />}

            <Button size="lg" onPress={() => props.navigation.navigate('Home')} value="Continuar" />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // padding: 12
    },
    image: {
        height: 250,
        marginVertical: 50
    }
});