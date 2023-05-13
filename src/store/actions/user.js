import { authSignOut, authConfirmVerificationCode, authSignInWithPhoneNumber } from "../services/auth";
import { databaseReadUserData, databaseUpdateUserData } from "../services/database";
import { storageSaveUserlogs, storageSaveUserProfilePhoto } from "../services/storage";
import { log } from "../../utils/logging";
import { TT, ToastMessage } from "../../components/atoms/toast-message";


export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_UPDATE = 'USER_UPDATE';
export const userLogin = user => ({ type: USER_LOGIN, user });
export const userLogout = () => ({ type: USER_LOGOUT });
export const userUpdate = update => ({ type: USER_UPDATE, update });


export const signInUser = phone => async dispatch => {
    log.info("⚛️ signInUser() ", { phone });
    ToastMessage("Fazendo login com telefone 📲", TT.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const response = await authSignInWithPhoneNumber(phone);
    if (response.isSuccessful) {
        log.success("⚛️ signInUser()");
        ToastMessage('Você receberá um código de verificação por SMS 📩', TT.SUCCESS);
        dispatch(userUpdate({ confirmation: response.confirmation, isLoading: false }));
    } else {
        log.error("⚛️ signInUser()");
        ToastMessage("Ocorreu um erro ao fazer login ⚠️", TT.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const confirmUserPhone = (confirmation, code) => async dispatch => {
    log.info("⚛️ confirmUserPhone() ", { confirmation, code });
    ToastMessage("Confirmando seu código 🔐", TT.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const response = await authConfirmVerificationCode(confirmation, code);
    if (response.isSuccessful) {
        log.success("⚛️ confirmUserPhone()");
        ToastMessage('Código confirmando com sucesso! ✅', TT.SUCCESS);
        dispatch(userUpdate({ confirmation: true, isLoading: false }));
    } else {
        log.error("⚛️ confirmUserPhone()");
        ToastMessage("Ocorreu um erro ao confirmar o código de verificação ⚠️", TT.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const disconnectUser = () => async dispatch => {
    log.info("⚛️ disconnectUser() ");
    ToastMessage("Saindo 🛵💨", TT.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const response = await authSignOut();
    if (response.isSuccessful) {
        log.success("⚛️ disconnectUser()");
        ToastMessage('Logout bem sucedido! ✅', TT.SUCCESS);
        dispatch(userLogout());
    } else {
        log.error("⚛️ disconnectUser()");
        ToastMessage("Ocorreu um erro ao desconectar ⚠️", TT.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const uploadUserData = (uid, data) => async dispatch => {
    log.info("⚛️ uploadUserData() ", { uid, data });
    ToastMessage("Salvando informações 🔄", TT.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const response = await databaseUpdateUserData(uid, data);
    if (response.isSuccessful) {
        log.success("⚛️ uploadUserData()");
        ToastMessage('Informações salvas! ✅', TT.SUCCESS);
        dispatch(userUpdate({ isLoading: false, ...data }));
    } else {
        log.error("⚛️ uploadUserData()");
        ToastMessage("Ocorreu um erro ao salvar as informações 😢", TT.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const checkUserData = (userData, callback) => async dispatch => {
    log.info("⚛️ checkUserData() ", { userData });
    ToastMessage("Verificando seu login 🔐", TT.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const { uid } = userData;
    const response = await databaseReadUserData(uid);
    const { isSuccessful, user } = response;
    if (isSuccessful) {
        log.success("⚛️ checkUserData()");
        ToastMessage('Autenticação bem sucedida! ✅', TT.SUCCESS);
        if (user && user.hasOwnProperty('uid')) {
            dispatch(userLogin(user));
        } else {
            dispatch(uploadUserData(uid, { ...userData }));
        }
    } else {
        log.error("⚛️ checkUserData()");
        ToastMessage("Falha na autenticação 😢", TT.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
    callback();
};

export const saveUserProfilePhoto = (uid, photoPath) => async dispatch => {
    log.info("⚛️ saveUserProfilePhoto() ", { uid, photoPath });
    ToastMessage('Salvando foto 📸', TT.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const response = await storageSaveUserProfilePhoto(uid, photoPath);
    const { isSuccessful, photoURL } = response;
    if (isSuccessful) {
        log.success("⚛️ saveUserProfilePhoto()");
        ToastMessage('Foto salva com sucesso! ✅', TT.SUCCESS);
        dispatch(userUpdate({ isLoading: false, photoURL }));
    } else {
        log.error("⚛️ saveUserProfilePhoto()");
        ToastMessage("Ocorreu um erro ao salvar a imagem ⚠️", TT.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const upploadUserLogs = (uid) => async dispatch => {
    log.info("⚛️ upploadUserLogs() ", { uid });
    ToastMessage("Enviando relatório de depuração 📤", TT.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const response = await storageSaveUserlogs(uid);
    if (response.isSuccessful) {
        log.success("⚛️ upploadUserLogs()");
        ToastMessage('Relatório enviado! ✅', TT.SUCCESS);
        dispatch(userUpdate({ isLoading: false }));
    } else {
        log.error("⚛️ upploadUserLogs()");
        ToastMessage("Erro ao enviar relatório ⚠️", TT.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};