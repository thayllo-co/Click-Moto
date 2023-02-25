import React from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../atoms/button';
import { disconnectUser, upploadUserLogs } from '../../../store/actions/user';


export default Home = () => {

    const dispatch = useDispatch();
    const uid = useSelector(state => state.user?.uid);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FDE93A'
            }}>

            <Text>PASSENGER HOME! Edit me! 🎉</Text>

            <Button size="lg" onPress={() => dispatch(disconnectUser())}>Sair</Button>

            <Button size="lg" onPress={() => dispatch(upploadUserLogs(uid))}>Enviar Logs</Button>

        </View>
    );
}