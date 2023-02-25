import database from '@react-native-firebase/database';

import { ToastMessage, TYPE } from '../../components/atoms/toast-message';
import { log } from '../../utils/logging';

const environment = process.env.NODE_ENV;
const DB_USERS_PATH = "/users/";


const DATABASE_TYPE = { CREATE: "CREATE", READ: "READ", UPDATE: "UPDATE", DELETE: "DELETE" };

const callDatabase = (requestType, databasePath, data) => {
    switch (requestType) {
        case DATABASE_TYPE.CREATE:
            return database().ref(databasePath).set(data);

        case DATABASE_TYPE.READ:
            return database().ref(databasePath).once('value');

        case DATABASE_TYPE.UPDATE:
            return database().ref(databasePath).update(data);

        case DATABASE_TYPE.DELETE:
            return database().ref(databasePath).remove();

        default:
            return null;
    }
}

export const databaseReadUserData = async uid => {
    ToastMessage("Verificando dados 💾", TYPE.INFO);
    log.info("🔥 databaseReadUserData()");
    try {
        const response = await callDatabase(DATABASE_TYPE.READ, environment + DB_USERS_PATH + uid, null);
        ToastMessage('Dados verificados! ✅', TYPE.SUCCESS);
        log.success("🔥 databaseReadUserData() ", response);
        const user = response.val();
        if (user) {
            return { itSucceed: true, user };
        } else {
            return { itSucceed: true };
        }
    } catch (error) {
        ToastMessage("⚠️ Ocorreu um erro ao ler os dados no banco de dados", TYPE.ERROR);
        log.error("🔥 databaseReadUserData() ", error);
        return { itSucceed: false };
    }
}

export const databaseUpdateUserData = async (uid, data) => {
    ToastMessage("Salvando tudo no banco de dados 💾", TYPE.INFO);
    log.info("🔥 databaseUpdateUserData()");
    try {
        await callDatabase(DATABASE_TYPE.UPDATE, environment + DB_USERS_PATH + uid, data);
        ToastMessage('Dados salvos com sucesso! ✅', TYPE.SUCCESS);
        log.success("🔥 databaseUpdateUserData()");
        return { itSucceed: true };
    } catch (error) {
        ToastMessage("⚠️ Ocorreu um erro ao atualizar os dados no banco de dados", TYPE.ERROR);
        log.error("🔥 databaseUpdateUserData() ", error);
        return { itSucceed: false };
    }
}