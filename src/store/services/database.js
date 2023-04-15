import database from '@react-native-firebase/database';

import { ToastMessage, TYPE } from '../../components/atoms/toast-message';
import { USER_STATUS } from '../../utils/constants';
import { log } from '../../utils/logging';


const DATABASE_TYPE = { CREATE: "CREATE", READ: "READ", UPDATE: "UPDATE", DELETE: "DELETE", WATCH: "WATCH", DISWATCH: "DISWATCH" };
const environment = process.env.NODE_ENV; // const env = (__DEV__) ? "dev" : "prod";
const DB_USERS_PATH = "/users/";
const DB_ONLINE_DRIVERS_PATH = "/onlineDrivers/";
const DB_RIDES_PATH = "/rides/";

const callDatabase = (requestType, databasePath, data) => { // data também usado como watchCallback
    log.info("🔥 callDatabase(" + requestType + ":" + databasePath + ")");
    switch (requestType) {
        case DATABASE_TYPE.CREATE:
            return database().ref(environment + databasePath).set(data);

        case DATABASE_TYPE.READ:
            return database().ref(environment + databasePath).once('value');

        case DATABASE_TYPE.UPDATE:
            return database().ref(environment + databasePath).update(data);

        case DATABASE_TYPE.DELETE:
            return database().ref(environment + databasePath).remove();

        case DATABASE_TYPE.WATCH:
            return database().ref(environment + databasePath)
                .on('value', snapshot => {
                    if (snapshot.exists())
                        data(snapshot.val());
                    else
                        data(null);
                });

        case DATABASE_TYPE.DISWATCH:
            return database().ref(environment + databasePath)
                .off('value', () => data());

        default:
            return null;
    }
}

export const databaseReadUserData = async uid => {
    ToastMessage("Verificando dados 💾", TYPE.INFO);
    log.info("🔥 databaseReadUserData()");
    try {
        const response = await callDatabase(DATABASE_TYPE.READ, DB_USERS_PATH + uid, null);
        ToastMessage('Dados verificados! ✅', TYPE.SUCCESS);
        log.success("🔥 databaseReadUserData() ", response);
        const user = response.val();
        if (user) {
            return { isSuccessful: true, user };
        } else {
            return { isSuccessful: true };
        }
    } catch (error) {
        ToastMessage("⚠️ Ocorreu um erro ao ler os dados no banco de dados", TYPE.ERROR);
        log.error("🔥 databaseReadUserData() ", error);
        return { isSuccessful: false };
    }
}

export const databaseUpdateUserData = async (uid, data) => {
    ToastMessage("Salvando tudo no banco de dados 💾", TYPE.INFO);
    log.info("🔥 databaseUpdateUserData()");
    try {
        await callDatabase(DATABASE_TYPE.UPDATE, DB_USERS_PATH + uid, data);
        ToastMessage('Dados salvos com sucesso! ✅', TYPE.SUCCESS);
        log.success("🔥 databaseUpdateUserData()");
        return { isSuccessful: true };
    } catch (error) {
        ToastMessage("⚠️ Ocorreu um erro ao atualizar os dados no banco de dados", TYPE.ERROR);
        log.error("🔥 databaseUpdateUserData() ", error);
        return { isSuccessful: false };
    }
}

export const databaseUpdateUserToken = async (uid, token) => {
    log.info("🔥 databaseUpdateUserToken()");
    try {
        await callDatabase(DATABASE_TYPE.UPDATE, DB_USERS_PATH + uid, { token });
        log.success("🔥 databaseUpdateUserToken()");
    } catch (error) {
        log.error("🔥 databaseUpdateUserToken() ", error);
    }
}

export const databaseJoinOnlineDrivers = async (uid, location) => {
    log.info("🔥 databaseJoinOnlineDrivers()");
    try {
        await callDatabase(DATABASE_TYPE.CREATE, DB_ONLINE_DRIVERS_PATH + uid, { uid, location });
        log.success("🔥 databaseJoinOnlineDrivers()");
        return { isSuccessful: true };
    } catch (error) {
        log.error("🔥 databaseJoinOnlineDrivers() ", error);
        return { isSuccessful: false };
    }
}

export const databaseUpdateOnlineDrivers = async (uid, location) => {
    log.info("🔥 databaseUpdateOnlineDrivers()");
    try {
        await callDatabase(DATABASE_TYPE.UPDATE, DB_ONLINE_DRIVERS_PATH + uid, { uid, location });
        log.success("🔥 databaseUpdateOnlineDrivers()");
        return { isSuccessful: true };
    } catch (error) {
        log.error("🔥 databaseUpdateOnlineDrivers() ", error);
        return { isSuccessful: false };
    }
}

export const databaseLeaveOnlineDrivers = async uid => {
    log.info("🔥 databaseLeaveOnlineDrivers()");
    try {
        await callDatabase(DATABASE_TYPE.DELETE, DB_ONLINE_DRIVERS_PATH + uid, null);
        log.success("🔥 databaseLeaveOnlineDrivers()");
        return { isSuccessful: true };
    } catch (error) {
        log.error("🔥 databaseLeaveOnlineDrivers() ", error);
        return { isSuccessful: false };
    }
}

export const databaseStartWatchingOnlineDrivers = async watchCallback => {
    log.info("🔥 databaseStartWatchingOnlineDrivers()");
    return callDatabase(DATABASE_TYPE.WATCH, DB_ONLINE_DRIVERS_PATH, watchCallback);
}

export const databaseStopWatchingOnlineDrivers = async watchCallback => {
    log.info("🔥 databaseStopWatchingOnlineDrivers()");
    return callDatabase(DATABASE_TYPE.DISWATCH, DB_ONLINE_DRIVERS_PATH, watchCallback);
}

export const databaseStartWatchingChangesOnRide = async (rideUID, watchCallback) => {
    log.info("🔥 databaseStartWatchingChangesOnRide()");
    return callDatabase(DATABASE_TYPE.WATCH, DB_RIDES_PATH + rideUID, watchCallback);
}

export const databaseStopWatchingChangesOnRide = async (rideUID, watchCallback) => {
    log.info("🔥 databaseStopWatchingChangesOnRide()");
    return callDatabase(DATABASE_TYPE.DISWATCH, DB_RIDES_PATH + rideUID, watchCallback);
}

export const databaseGetRideOngoing = async rideUID => {
    log.info("🔥 databaseGetRideOngoing()");
    try {
        const response = await callDatabase(DATABASE_TYPE.READ, DB_RIDES_PATH + rideUID, null);
        log.success("🔥 databaseGetRideOngoing()");
        const rideOngoing = response.val();
        return { isSuccessful: true, rideOngoing };
    } catch (error) {
        log.error("🔥 databaseGetRideOngoing() ", error);
        return { isSuccessful: false };
    }
}

export const databaseStartRideOngoing = async rideUID => {
    log.info("🔥 databaseStartRideOngoing()");
    try {
        await callDatabase(DATABASE_TYPE.UPDATE, DB_RIDES_PATH + rideUID, { status: USER_STATUS.ONGOING });
        log.success("🔥 databaseStartRideOngoing()");
        return { isSuccessful: true };
    } catch (error) {
        log.error("🔥 databaseStartRideOngoing() ", error);
        return { isSuccessful: false };
    }
}

export const databaseUpdateCurrentRideLocation = async (rideUID, currentLocation) => {
    log.info("🔥 databaseUpdateCurrentRideLocation()");
    try {
        await callDatabase(DATABASE_TYPE.UPDATE, DB_RIDES_PATH + rideUID, { currentLocation });
        log.success("🔥 databaseUpdateCurrentRideLocation()");
        return { isSuccessful: true };
    } catch (error) {
        log.error("🔥 databaseUpdateCurrentRideLocation() ", error);
        return { isSuccessful: false };
    }
}

export const databaseCompleteRideWaypoint = async rideUID => {
    log.info("🔥 databaseCompleteRideWaypoint()");
    try {
        await callDatabase(DATABASE_TYPE.UPDATE, DB_USERS_PATH + rideUID, { waypoints: USER_STATUS.DONE });
        log.success("🔥 databaseCompleteRideWaypoint()");
        return { isSuccessful: true };
    } catch (error) {
        log.error("🔥 databaseCompleteRideWaypoint() ", error);
        return { isSuccessful: false };
    }
}