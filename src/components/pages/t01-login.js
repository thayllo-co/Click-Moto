import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import BackgroundDefault from '../templates/background-default';
import Image from '../atoms/image';
import Text from '../atoms/text';
import PhoneForm from '../organisms/phone-form';
import Footer from '../molecules/footer';
import logo from '../../assets/images/logo.png';
import RoleForm from '../organisms/role-form';
import { ToastMessage, TYPE } from '../atoms/toast-message';


export default LoginPage = props => {

    const [role, setRole] = useState(null);

    const handleSubmitPhone = phone => {
        ToastMessage("LoginPage - handleSubmitPhone", TYPE.SUCCESS);
        console.log("LoginPage - handleSubmitPhone: ", phone);
    }

    const handleSubmitCode = code => {
        ToastMessage("LoginPage - handleSubmitCode", TYPE.SUCCESS);
        console.log("LoginPage - handleSubmitCode: ", code);
        props.navigation.navigate('AddProfileInfo')
    }

    return (
        <BackgroundDefault>

            <Image source={logo} style={styles.image} />

            {!role &&
                <Text light title center size="xs" value="Escolha como deseja continuar" />}

            {role &&
                <Text light title center size="xs" value="Entre com seu telefone" />}

            {!role &&
                <RoleForm roleCallback={setRole} />}

            {role &&
                <PhoneForm handleSubmitPhone={handleSubmitPhone} handleSubmitCode={handleSubmitCode} />}

            <Footer navigation={props.navigation} />

        </BackgroundDefault>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 250,
        marginBottom: 20
    }
});