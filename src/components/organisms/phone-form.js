import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import InputForm from '../molecules/input-form';
import Button from '../atoms/button';
import Text from '../atoms/text';

import { DDD_LENGTH, PHONE_LENGTH, VERIFICATION_CODE_LENGTH } from '../../utils/constants';
import { ToastMessage, TT } from '../atoms/toast-message';
import Image from '../atoms/image';


export default PhoneForm = props => {

    const [ddd, setDDD] = useState(null);
    const [phone, setPhone] = useState(null);
    const [verificationCode, setVerificationCode] = useState(null);
    const [isVerificationCodeVisible, setIsVerificationCodeVisible] = useState(false);

    submitFullPhone = () => {
        if (ddd && phone) {
            props.handleSubmitPhone(ddd + phone);
            setIsVerificationCodeVisible(true);
        } else {
            ToastMessage("Preencha os dados corretamente para continuar.", TT.ERROR);
        }
    }

    submitVerificationCode = () => {
        if (verificationCode) {
            props.handleSubmitCode(verificationCode);
        } else {
            ToastMessage("Preencha os dados corretamente para continuar.", TT.ERROR);
        }
    }

    startOver = () => {
        setDDD(null);
        setPhone(null);
        setVerificationCode(null);
        setIsVerificationCodeVisible(false);
    }

    return (
        <View style={styles.container}>

            <Image source={logo} style={styles.image} />

            <Text light title center size="xs" value="Entre com seu telefone" />

            {!isVerificationCodeVisible &&
                <Animatable.View animation={"bounceIn"} style={styles.phoneRow}>

                    <InputForm
                        placeholder="19"
                        keyboardType="numeric"
                        maxLength={DDD_LENGTH}
                        minLength={DDD_LENGTH}
                        getValue={setDDD}
                        center
                        size="xs" />

                    <InputForm
                        placeholder="98765-4321"
                        keyboardType="numeric"
                        maxLength={PHONE_LENGTH}
                        minLength={PHONE_LENGTH}
                        getValue={setPhone}
                        center
                        size="md" />

                </Animatable.View>}

            {!isVerificationCodeVisible &&
                <Animatable.View animation={"bounceIn"} style={styles.verificationCodeWrapper}>
                    <Button size="lg" onPress={submitFullPhone} value="Enviar código" />
                </Animatable.View>}

            {isVerificationCodeVisible &&
                <Animatable.View animation={"bounceIn"} style={styles.verificationCodeWrapper}>
                    <InputForm
                        placeholder="000000"
                        keyboardType='numeric'
                        maxLength={VERIFICATION_CODE_LENGTH}
                        minLength={VERIFICATION_CODE_LENGTH}
                        getValue={setVerificationCode}
                        center
                        size="lg" />

                </Animatable.View>}

            {isVerificationCodeVisible &&
                <Animatable.View animation={"bounceIn"} style={styles.verificationCodeWrapper}>

                    <Button size="lg" onPress={startOver} value="Recomeçar" />

                    <Button size="lg" onPress={submitVerificationCode} value="Confirmar" />

                </Animatable.View>}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: 250,
        justifyContent: 'space-between'
    },
    image: {
        height: 250,
        marginBottom: 20
    },
    phoneRow: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 12
    },
    verificationCodeWrapper: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonsWrapper: {
        width: '100%'
    }
});