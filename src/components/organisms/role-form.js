import { StyleSheet, View } from 'react-native';

import Button from '../atoms/button';
import Text from '../atoms/text';

import { USER_ROLE } from '../../utils/constants';
import Image from '../atoms/image';
import logo from '../../assets/images/logo.png';


export default RoleForm = props => {
    return (
        <View style={styles.container}>

            <Image source={logo} style={styles.image} />

            <Text light title center size="xs" value="Escolha como deseja continuar" />

            {/* <Button size="lg" onPress={() => props.handleSubmitRole(USER_ROLE.ADMIN)} value="Administrador" /> */}

            <Button size="lg" onPress={() => props.handleSubmitRole(USER_ROLE.DRIVER)} value="Motorista" />

            <Button size="lg" onPress={() => props.handleSubmitRole(USER_ROLE.PASSENGER)} value="Passageiro" />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    image: {
        height: 250,
        width: '100%',
        marginBottom: 20
    }
});