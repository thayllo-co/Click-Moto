import auth from "@react-native-firebase/auth";

import { ToastMessage, TYPE } from "../../components/atoms/toast-message";
import { log } from "../../utils/logging";


export const authOnAuthStateChanged = (hasUserCallback, hasNoUserCallback) => auth()
    .onAuthStateChanged(user => {
        log.info("🔥 authOnAuthStateChanged() ", user);
        if (user) {
            const { phoneNumber, uid } = user;
            hasUserCallback({ phoneNumber, uid });
        } else {
            hasNoUserCallback();
        }
    });

export const authSignInWithPhoneNumber = async phoneNumber => {
    ToastMessage("Fazendo login com telefone 📲", TYPE.INFO);
    log.info("🔥 authSignInWithPhoneNumber()");
    try {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        ToastMessage('Você receberá um código de verificação por SMS 📩', TYPE.SUCCESS);
        log.success("🔥 authSignInWithPhoneNumber()");
        return { isSuccessful: true, confirmation };
    } catch (error) {
        ToastMessage("⚠️ Ocorreu um erro ao fazer login", TYPE.ERROR);
        log.error("🔥 authSignInWithPhoneNumber() ", error);
        return { isSuccessful: false };
    }
}

export const authConfirmVerificationCode = async (confirmation, code) => {
    ToastMessage("Confirmando seu código, aguarde um pouco 🔐", TYPE.INFO);
    log.info("🔥 authConfirmVerificationCode()");
    try {
        await confirmation.confirm(code);
        ToastMessage('Código confirmando com sucesso! ✅', TYPE.SUCCESS);
        log.success("🔥 authConfirmVerificationCode()");
        return { isSuccessful: true };
    } catch (error) {
        ToastMessage("⚠️ Ocorreu um erro ao confirmar o código de verificação", TYPE.ERROR);
        log.error("🔥 authConfirmVerificationCode() ", error);
        return { isSuccessful: false };
    }
}

export const authSignOut = async () => {
    ToastMessage("Saindo...", TYPE.INFO);
    log.info("🔥 authSignOut()");
    try {
        await auth().signOut();
        ToastMessage('Logout bem sucedido! ✅', TYPE.SUCCESS);
        log.success("🔥 authSignOut()");
        return { isSuccessful: true };
    } catch (error) {
        ToastMessage("⚠️ Ocorreu um erro ao desconectar o usuário", TYPE.ERROR);
        log.error("🔥 authSignOut()", error);
        return { isSuccessful: false };
    }
}
