// user.js
// 🔹userLogin
// 🔹userLogout
// 🔹userUpdate
// 🔸verifyUser
// 🔸updateUserInfo
// 🔸disconnectUser

// CONSTANTES DE TIPOS DE ACTIONS 
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