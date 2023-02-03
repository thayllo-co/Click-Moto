import { USER_LOGIN, USER_LOGOUT, USER_UPDATE } from '../actions/user';

const userReducer = (state = null, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return Object.assign({}, action.user);

        case USER_UPDATE:
            return Object.assign({}, { ...state, ...action.update });

        case USER_LOGOUT:
            return null;

        default:
            return state;
    }
}

export default userReducer;