import storage from '@react-native-firebase/storage';

import { log, zipLogs } from '../../utils/logging';

const environment = process.env.NODE_ENV;
const ST_USERS_PATH = "/users/";
const ST_LOGS_PATH = "/logs/";


export const storageSaveUserProfilePhoto = async (uid, image) => {
    log.info("🔥 storageSaveUserProfilePhoto()");
    try {
        await storage().ref(environment + ST_USERS_PATH + uid).putFile(image);
        const photoURL = await storage().ref(environment + ST_USERS_PATH + uid).getDownloadURL();
        log.success("🔥 storageSaveUserProfilePhoto() ", photoURL);
        return { isSuccessful: true, photoURL };
    } catch (error) {
        log.error("🔥 storageSaveUserProfilePhoto() ", error);
        return { isSuccessful: false };
    }
}

export const storageSaveUserlogs = async uid => {
    log.info("🔥 storageSaveUserlogs()");
    try {
        const zipPath = await zipLogs();
        await storage().ref(environment + ST_LOGS_PATH + uid).putFile(`file://${zipPath}`);
        log.success("🔥 storageSaveUserlogs()");
        return { isSuccessful: true };
    } catch (error) {
        log.error("🔥 storageSaveUserlogs() ", error);
        return { isSuccessful: false };
    }
}