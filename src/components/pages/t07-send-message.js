import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import BackgroundDefault from '../templates/background-default';
import Text from '../atoms/text';
import InputForm from '../molecules/input-form';
import Button from '../atoms/button';

export default SendMessage = props => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const [message, setMessage] = useState("");

    const sendMessage = () => {
        console.log("SEND MESSAGE: ", message);
    }

    return (
        <BackgroundDefault isLoading={user?.isLoading}>

            <Header navigationBack navigation={props.navigation} header="Fale Conosco" />

            <Text light title center size="lg" value="Como podemos ajudar?" />

            <View style={styles.textBoxWrapper}>
                <InputForm
                    placeholder="Escreva sua mensagem."
                    multiline
                    getValue={setMessage}
                    size="xl"
                    maxLength={1000}
                    minLength={10}
                    numberOfLines={10} />
            </View>

            <Button size="lg" onPress={sendMessage} value="Enviar" />

        </BackgroundDefault>
    );
}

const styles = StyleSheet.create({
    textBoxWrapper: {
        marginHorizontal: 12
    }
});