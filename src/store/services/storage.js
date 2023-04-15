import storage from '@react-native-firebase/storage';

import { ToastMessage, TYPE } from '../../components/atoms/toast-message';
import { log, zipLogs } from '../../utils/logging';

const environment = process.env.NODE_ENV;
const ST_USERS_PATH = "/users/";
const ST_LOGS_PATH = "/logs/";


export const storageSaveUserProfilePhoto = async (uid, image) => {
    ToastMessage('Salvando foto 📸', TYPE.INFO);
    log.info("🔥 storageSaveUserProfilePhoto()");
    try {
        await storage().ref(environment + ST_USERS_PATH + uid).putFile(image);
        const photoURL = await storage().ref(environment + ST_USERS_PATH + uid).getDownloadURL();
        ToastMessage('Foto salva com sucesso! ✅', TYPE.SUCCESS);
        log.success("🔥 storageSaveUserProfilePhoto() ", photoURL);
        return { isSuccessful: true, photoURL };
    } catch (error) {
        ToastMessage("⚠️ Ocorreu um erro ao armazenar a imagem no banco de dados", TYPE.ERROR);
        log.error("🔥 storageSaveUserProfilePhoto() ", error);
        return { isSuccessful: false };
    }
}

export const storageSaveUserlogs = async uid => {
    ToastMessage('Salvando registros 📝', TYPE.INFO);
    log.info("🔥 storageSaveUserlogs()");
    try {
        const zipPath = await zipLogs();
        await storage().ref(environment + ST_LOGS_PATH + uid).putFile(`file://${zipPath}`);
        ToastMessage('Registros salvos com sucesso! ✅', TYPE.SUCCESS);
        log.success("🔥 storageSaveUserlogs()");
        return { isSuccessful: true };
    } catch (error) {
        ToastMessage("⚠️ Ocorreu um erro ao armazenar seus registros no banco de dados", TYPE.ERROR);
        log.error("🔥 storageSaveUserlogs() ", error);
        return { isSuccessful: false };
    }
}