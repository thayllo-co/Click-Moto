import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Text from '../atoms/text';
import InputForm from '../molecules/input-form';
import Button from '../atoms/button';

export default SendMessageForm = props => {

    const [message, setMessage] = useState("");

    return (
        <View>

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

            <Button size="lg" onPress={() => props.sendMessage(message)} value="Enviar" />

        </View>
    );
};

const styles = StyleSheet.create({
    textBoxWrapper: {
        marginHorizontal: 12
    }
});