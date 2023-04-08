import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import InputForm from '../molecules/input-form';
import PhotoForm from '../molecules/photo-form';
import Button from '../atoms/button';
import { BIRTH_LENGTH, CPF_LENGTH, EMAIL_LENGTH, MAX_INPUT_LINE_LENGTH, MIN_INPUT_LENGTH } from '../../utils/constants';
import { ToastMessage, TYPE } from '../atoms/toast-message';
import PhotoPicker from './photo-picker';
import { saveUserProfilePhoto } from '../../store/actions/user';


export default LoginForm = props => {

    const dispatch = useDispatch();
    const uid = useSelector(state => state.user?.uid);
    const photoURL = useSelector(state => state.user?.photoURL);

    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [email, setEmail] = useState(null);
    const [cpf, setCPF] = useState(null);
    const [birthDate, setBirthDate] = useState(null);
    const [isPhotoPickerVisible, setIsPhotoPickerVisible] = useState(false);

    togglePhotoPicker = () => setIsPhotoPickerVisible(!isPhotoPickerVisible);

    const validateForm = () => {
        if (name && surname && email && photoURL && cpf && birthDate) {
            props.handleSubmitData({ name, surname, email, photoURL, cpf, birthDate });
        } else {
            ToastMessage("Preencha os dados corretamente para continuar.", TYPE.ERROR);
        }
    }

    const handleSubmitPhoto = photoPath => {
        dispatch(saveUserProfilePhoto(uid, photoPath));
    }


    return (
        <View style={styles.container}>

            <PhotoForm photoURL={photoURL} openPhotoPicker={togglePhotoPicker} />

            <PhotoPicker isVisible={isPhotoPickerVisible} toggler={togglePhotoPicker} handleSubmitPhoto={handleSubmitPhoto} />

            <InputForm
                label="Nome"
                placeholder="Maria"
                autoCapitalize="words"
                getValue={setName}
                minLength={MIN_INPUT_LENGTH}
                maxLength={MAX_INPUT_LINE_LENGTH}
                size="lg"
                center />

            <InputForm
                label="Sobrenome"
                placeholder="Silva"
                autoCapitalize="words"
                getValue={setSurname}
                minLength={MIN_INPUT_LENGTH}
                maxLength={MAX_INPUT_LINE_LENGTH}
                size="lg"
                center />

            <InputForm
                label="Email"
                placeholder="maria@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                getValue={setEmail}
                minLength={MIN_INPUT_LENGTH}
                maxLength={EMAIL_LENGTH}
                size="lg"
                center />

            <InputForm
                label="CPF"
                placeholder="123.456.789-00"
                keyboardType="numeric"
                getValue={setCPF}
                minLength={CPF_LENGTH}
                maxLength={CPF_LENGTH}
                size="lg"
                center
                masked
                type={'cpf'} />

            <InputForm
                label="Data de nascimento"
                placeholder="01/01/2000"
                keyboardType="numeric"
                getValue={setBirthDate}
                minLength={BIRTH_LENGTH}
                maxLength={BIRTH_LENGTH}
                size="lg"
                center
                masked
                type={'datetime'}
                options={{ format: 'DD/MM/AAAA' }} />

            <View style={styles.innerContainer}>

                <Button size="lg" onPress={validateForm} value="Próximo" />

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    innerContainer: {
        width: '100%',
        paddingTop: 8,
        paddingBottom: 8,
        alignItems: 'center'
    },
    userPhoto: {
        height: 125,
        width: 125,
    }
});