import React from 'react';
import { StyleSheet, View } from 'react-native';

import Text from '../atoms/text';
import attach from '../../assets/images/attach.png';
import IconButton from '../molecules/icon-button';
import { log } from '../../utils/logging';


export default WelcomeDriver = props => {
    return (
        <View style={styles.container}>

            <Text paragraph light center size="xl" value="Para completar seu cadastro e começar a receber as corridas precisamos que faça o envio de todos os documentos solicitados." />

            <IconButton filled dark source={attach} size="sm" label="Documentos" onPress={() => log.error("OPEN DOCS INSTRUCTIONS")} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12
    }
});