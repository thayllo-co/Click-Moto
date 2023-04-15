import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';

import { log } from '../../utils/logging';
import { databaseUpdateUserToken } from './database';


export const messagingRegisterApp = async () => {
    log.info("📨 messagingRegisterApp()");
    await messaging().registerDeviceForRemoteMessages();
}

export const messagingDisplayNotification = async (title, body) => {
    log.info("📨 messagingDisplayNotification() ", title, body);
    if (!title)
        title = "Nova mensagem!"
    if (!body)
        body = "Entre para ver mais detalhes."
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
        id: 'custom-sound',
        name: 'Channel with custom sound',
        sound: 'motorcycle' // Android >= 8.0 (API level 26)
    });
    await notifee.displayNotification({
        title,
        body,
        android: {
            channelId,
            smallIcon: 'ic_launcher_round',
            sound: 'motorcycle' // Android < 8.0 (API level 26)
        },
    });
}

export const messagingRequestPermission = async () => {
    log.info("📨 messagingRequestPermission()");
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
        log.success("📨 messagingRequestPermission() ", authStatus);
    } else {
        log.error("📨 messagingRequestPermission() ", authStatus);
    }
}

export const messagingSaveUserToken = async () => {
    log.info("📨 messagingSaveUserToken()");
    try {
        const token = await messaging().getToken();
        log.success("📨 messagingSaveUserToken() ", token);
        messagingUpdateUserTokenOnDatabase(token);
    } catch (error) {
        log.error("📨 messagingSaveUserToken() ", error);
    }
}

export const messagingHandleTokenUpdates = async () =>
    messaging().onTokenRefresh(token => messagingUpdateUserTokenOnDatabase(token));

const messagingUpdateUserTokenOnDatabase = async (token) => {
    try {
        const userUID = auth().currentUser?.uid;
        log.info("📨 messagingUpdateUserTokenOnDatabase() ", userUID);
        if (userUID) {
            databaseUpdateUserToken(userUID, token );
        } else {
            log.error("📨 messagingUpdateUserTokenOnDatabase() userUID is null");
        }
    } catch (error) {
        log.error("📨 messagingUpdateUserTokenOnDatabase() ", error);
    }
}