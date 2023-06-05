import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BackgroundDefault from './templates/background-default';
import PhoneForm from '../organisms/phone-form';
import Footer from '../molecules/footer';
import RoleForm from '../organisms/role-form';
import { confirmUserPhone, signInUser, uploadUserData } from '../../store/actions/user';


export default LoginPage = props => {

    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.user?.isLoading);
    const confirmation = useSelector(state => state.user?.confirmation);
    const uid = useSelector(state => state.user?.uid);

    return (
        <BackgroundDefault isLoading={isLoading}>

            {!uid && <PhoneForm
                handleSubmitPhone={phone => dispatch(signInUser("+55" + phone))}
                handleSubmitCode={code => dispatch(confirmUserPhone(confirmation, code))} />}

            {uid && <RoleForm handleSubmitRole={role => dispatch(uploadUserData(uid, { role }))} />}

            <Footer navigation={props.navigation} />

        </BackgroundDefault>
    );
};