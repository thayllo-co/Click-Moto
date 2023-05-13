import { ToastMessage, TT } from "../../components/atoms/toast-message";
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
    ToastMessage("Atualizando a disponibilidade ✨", TT.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const response = await databaseJoinOnlineDrivers(userUID, location);
    if (response.isSuccessful) {
        log.success("⚛️ joinOnlineDrivers() ");
        ToastMessage("Disponibilidade atualizada ✨", TT.SUCCESS);
        dispatch(uploadUserData(userUID, { isOnline: true }));
    } else {
        log.error("⚛️ joinOnlineDrivers() ");
        ToastMessage("Erro ao atualizar a disponibilidade 😢", TT.ERROR);
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
    ToastMessage("Atualizando a disponibilidade ✨", TT.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const response = await databaseLeaveOnlineDrivers(userUID);
    if (response.isSuccessful) {
        log.success("⚛️ leaveOnlineDrivers() ");
        ToastMessage("Disponibilidade atualizada ✨", TT.SUCCESS);
        dispatch(uploadUserData(userUID, { isOnline: false }));
    } else {
        log.error("⚛️ leaveOnlineDrivers() ");
        ToastMessage("Erro ao atualizar a disponibilidade 😢", TT.ERROR);
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
        log.success("⚛️ startWatchingOnlineDrivers() ", onlineDriversArray);
        dispatch(saveOnlineDrivers(onlineDriversArray));
    });
};

export const stopWatchingOnlineDrivers = () => async dispatch => {
    log.info("⚛️ stopWatchingOnlineDrivers()");
    const response = await databaseStopWatchingOnlineDrivers();
    if (response.isSuccessful) {
        log.success("⚛️ stopWatchingOnlineDrivers()");
        dispatch(deleteOnlineDrivers());
    } else {
        log.error("⚛️ stopWatchingOnlineDrivers()");
    }
};
