import { DELETE_ONLINE_DRIVERS, SAVE_ONLINE_DRIVERS } from "../actions/online-drivers";


export default onlineDriversReducer = (state = null, action) => {
    switch (action.type) {
        case SAVE_ONLINE_DRIVERS:
            return Object.assign([], action.drivers);

        case DELETE_ONLINE_DRIVERS:
            return null;

        default:
            return state;
    }
};