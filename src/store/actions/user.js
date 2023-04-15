import { authSignOut, authConfirmVerificationCode, authSignInWithPhoneNumber } from "../services/auth";
import { databaseReadUserData, databaseUpdateUserData } from "../services/database";
import { storageSaveUserlogs, storageSaveUserProfilePhoto } from "../services/storage";
import { log } from "../../utils/logging";

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_UPDATE = 'USER_UPDATE';

export const userLogin = user => ({
    type: USER_LOGIN,
    user
});

export const userLogout = () => ({
    type: USER_LOGOUT
});

export const userUpdate = update => ({
    type: USER_UPDATE,
    update
});

export const signInUser = phone => async dispatch => {
    log.info("⚛️ signInUser() ", phone);
    dispatch(userUpdate({ isLoading: true }));
    const response = await authSignInWithPhoneNumber(phone);
    if (response.isSuccessful) {
        dispatch(userUpdate({ confirmation: response.confirmation, isLoading: false }));
    } else {
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const confirmUserPhone = (confirmation, code) => async dispatch => {
    log.info("⚛️ confirmUserPhone() ", code);
    dispatch(userUpdate({ isLoading: true }));
    const response = await authConfirmVerificationCode(confirmation, code);
    if (response.isSuccessful) {
        dispatch(userUpdate({ confirmation: true, isLoading: false }));
    } else {
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const disconnectUser = () => async dispatch => {
    log.info("⚛️ disconnectUser() ");
    dispatch(userUpdate({ isLoading: true }));
    const response = await authSignOut();
    if (response.isSuccessful) {
        dispatch(userLogout());
    } else {
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const uploadUserData = (uid, data) => async dispatch => {
    log.info("⚛️ uploadUserData (", uid, "): ", data);
    dispatch(userUpdate({ isLoading: true }));
    const response = await databaseUpdateUserData(uid, data);
    if (response.isSuccessful) {
        dispatch(userUpdate({ isLoading: false, ...data }));
    } else {
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const checkUserData = userData => async dispatch => {
    log.info("⚛️ checkUserData() ", userData);
    dispatch(userUpdate({ isLoading: true }));
    const { uid } = userData;
    const response = await databaseReadUserData(uid);
    const { isSuccessful, user } = response;
    if (isSuccessful) {
        if (user && user.hasOwnProperty('uid')) {
            dispatch(userLogin(user));
        } else {
            dispatch(uploadUserData(uid, { ...userData }));
        }
    } else {
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const saveUserProfilePhoto = (uid, photoPath) => async dispatch => {
    log.info("⚛️ saveUserProfilePhoto() ", uid, " - ", photoPath);
    dispatch(userUpdate({ isLoading: true }));
    const response = await storageSaveUserProfilePhoto(uid, photoPath);
    const { isSuccessful, photoURL } = response;
    if (isSuccessful) {
        dispatch(userUpdate({ isLoading: false, photoURL }));
    } else {
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const upploadUserLogs = (uid) => async dispatch => {
    log.info("⚛️ upploadUserLogs() ", uid);
    dispatch(userUpdate({ isLoading: true }));
    const response = await storageSaveUserlogs(uid);
    if (response.isSuccessful) {
        dispatch(userUpdate({ isLoading: false }));
    } else {
        dispatch(userUpdate({ isLoading: false }));
    }
};