import auth from "@react-native-firebase/auth";
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
    log.info("🔥 authSignInWithPhoneNumber()");
    try {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        log.success("🔥 authSignInWithPhoneNumber()");
        return { isSuccessful: true, confirmation };
    } catch (error) {
        log.error("🔥 authSignInWithPhoneNumber() ", error);
        return { isSuccessful: false };
    }
};

export const authConfirmVerificationCode = async (confirmation, code) => {
    log.info("🔥 authConfirmVerificationCode()");
    try {
        await confirmation.confirm(code);
        log.success("🔥 authConfirmVerificationCode()");
        return { isSuccessful: true };
    } catch (error) {
        log.error("🔥 authConfirmVerificationCode() ", error);
        return { isSuccessful: false };
    }
};

export const authSignOut = async () => {
    log.info("🔥 authSignOut()");
    try {
        await auth().signOut();
        log.success("🔥 authSignOut()");
        return { isSuccessful: true };
    } catch (error) {
        log.error("🔥 authSignOut()", error);
        return { isSuccessful: false };
    }
};
