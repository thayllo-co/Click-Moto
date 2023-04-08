import React from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '../atoms/button';

import { ADMIN_ROLE, DRIVER_ROLE, PASSENGER_ROLE } from '../../utils/constants';


export default RoleForm = props => {
    return (
        <View style={styles.container}>

            <Button size="lg" onPress={() => props.handleSubmitRole(ADMIN_ROLE)} value="Administrador" />

            <Button size="lg" onPress={() => props.handleSubmitRole(DRIVER_ROLE)} value="Motorista" />

            <Button size="lg" onPress={() => props.handleSubmitRole(PASSENGER_ROLE)} value="Passageiro" />

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