import React from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '../atoms/button';

import { ADMIN_ROLE, DRIVER_ROLE, PASSENGER_ROLE } from '../../utils/constants';


export default RoleForm = props => {
    return (
        <View style={styles.container}>

            <Button size="lg" onPress={() => props.handleSubmitRole(ADMIN_ROLE)}>Administrador</Button>

            <Button size="lg" onPress={() => props.handleSubmitRole(DRIVER_ROLE)}>Motorista</Button>

            <Button size="lg" onPress={() => props.handleSubmitRole(PASSENGER_ROLE)}>Passageiro</Button>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        height: 250,
        justifyContent: 'space-evenly'
    }
});