import React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import BackgroundDefault from '../templates/background-default';
import Image from '../atoms/image';
import Text from '../atoms/text';
import PhoneForm from '../organisms/phone-form';
import Footer from '../molecules/footer';
import logo from '../../assets/images/logo.png';
import RoleForm from '../organisms/role-form';
import { confirmUserPhone, signInUser, uploadUserData } from '../../store/actions/user';


export default LoginPage = props => {

    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.user?.isLoading);
    const confirmation = useSelector(state => state.user?.confirmation);
    const uid = useSelector(state => state.user?.uid);

    const handleSubmitPhone = async phone => {
        dispatch(signInUser("+55" + phone));
    }

    const handleSubmitCode = async code => {
        dispatch(confirmUserPhone(confirmation, code));
    }

    const handleSubmitRole = async role => {
        dispatch(uploadUserData(uid, { role }));
    }

    return (
        <BackgroundDefault isLoading={isLoading}>

            <Image source={logo} style={styles.image} />

            {!uid &&
                <Text light title center size="xs" value="Entre com seu telefone" />}

            {!uid &&
                <PhoneForm handleSubmitPhone={handleSubmitPhone} handleSubmitCode={handleSubmitCode} />}

            {uid &&
                <Text light title center size="xs" value="Escolha como deseja continuar" />}

            {uid &&
                <RoleForm handleSubmitRole={role => handleSubmitRole(role)} />}

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