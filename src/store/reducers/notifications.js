import { DELETE_NOTIFICATION, SAVE_NOTIFICATION } from "../actions/notifications";


export default notificationsReducer = (state = null, action) => {
    switch (action.type) {
        case SAVE_NOTIFICATION:
            return Object.assign({}, action.notification);

        case DELETE_NOTIFICATION:
            return null;

        default:
            return state;
    }
};