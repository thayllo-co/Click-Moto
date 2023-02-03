import React from 'react';
import { StyleSheet, View } from 'react-native';

import Text from '../atoms/text';


export default WelcomeAdmin = props => {
    return (
        <View style={styles.container}>

            <Text title light center size="sm" value="Antes de começar a usar o aplicativo como administrador, entre em contato com seu desenvolvedor para permitir seu acesso." />

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        padding: 12
    }
});