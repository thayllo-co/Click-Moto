import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BackgroundDefault from '../templates/background-default';
import SendMessageForm from '../organisms/send-message-form';


export default SendMessage = props => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const sendMessage = message => {
        console.log("SEND MESSAGE: ", message);
    }

    return (
        <BackgroundDefault isLoading={user?.isLoading}>

            <Header navigationBack navigation={props.navigation} header="Fale Conosco" />

            <SendMessageForm sendMessage={message => sendMessage(message)} />

        </BackgroundDefault>
    );
};