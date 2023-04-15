import { ToastMessage, TYPE } from "../../components/atoms/toast-message";
import { log } from "../../utils/logging";
import {
    databaseJoinOnlineDrivers,
    databaseLeaveOnlineDrivers,
    databaseStartWatchingOnlineDrivers,
    databaseStopWatchingOnlineDrivers,
    databaseUpdateOnlineDrivers
} from "../services/database";
import { uploadUserData, userUpdate } from "./user";

export const SAVE_ONLINE_DRIVERS = 'SAVE_ONLINE_DRIVERS';
export const DELETE_ONLINE_DRIVERS = 'DELETE_ONLINE_DRIVERS';
export const saveOnlineDrivers = drivers => ({ type: SAVE_ONLINE_DRIVERS, drivers });
export const deleteOnlineDrivers = () => ({ type: DELETE_ONLINE_DRIVERS });

export const joinOnlineDrivers = (userUID, location) => async dispatch => {
    log.info("⚛️ joinOnlineDrivers() ", { userUID, location });
    ToastMessage("Atualizando a disponibilidade ✨", TYPE.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const response = await databaseJoinOnlineDrivers(userUID, location);
    if (response.isSuccessful) {
        dispatch(uploadUserData(userUID, { isOnline: true }));
    } else {
        ToastMessage("Ocorreu um erro inesperado 😢", TYPE.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const updateOnlineDrivers = (userUID, location) => async dispatch => {
    log.info("⚛️ updateOnlineDrivers() ", { userUID, location });
    const response = await databaseUpdateOnlineDrivers(userUID, location);
    if (response.isSuccessful) {
        log.success("⚛️ updateOnlineDrivers()");
    } else {
        log.error("⚛️ updateOnlineDrivers()");
    }
};

export const leaveOnlineDrivers = userUID => async dispatch => {
    log.info("⚛️ leaveOnlineDrivers() ", { userUID });
    ToastMessage("Atualizando a disponibilidade ✨", TYPE.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const response = await databaseLeaveOnlineDrivers(userUID);
    if (response.isSuccessful) {
        dispatch(uploadUserData(userUID, { isOnline: false }));
    } else {
        ToastMessage("Ocorreu um erro inesperado 😢", TYPE.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const startWatchingOnlineDrivers = () => async dispatch => {
    log.info("⚛️ startWatchingOnlineDrivers()");
    return databaseStartWatchingOnlineDrivers(onlineDriversObj => {
        log.success("⚛️ startWatchingOnlineDrivers() ", onlineDriversObj);
        let onlineDriversArray = [];
        for (const driver in onlineDriversObj) {
            if (onlineDriversObj[driver]?.location)
                onlineDriversArray.push(onlineDriversObj[driver]);
        }
        dispatch(saveOnlineDrivers(onlineDriversArray));
    });
};

export const stopWatchingOnlineDrivers = () => async dispatch => {
    log.info("⚛️ stopWatchingOnlineDrivers()");
    return databaseStopWatchingOnlineDrivers(() => dispatch(deleteOnlineDrivers()));
};
