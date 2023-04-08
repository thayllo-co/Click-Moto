import {
    RIDE_DRAFT_CREATE,
    RIDE_DRAFT_DELETE,
    RIDE_DRAFT_UPDATE,
    RIDE_ONGOING_CREATE,
    RIDE_ONGOING_DELETE,
    RIDE_ONGOING_UPDATE,
    RIDE_RATING_CREATE,
    RIDE_RATING_DELETE
} from "../actions/ride";


export default rideReducer = (state = null, action) => {
    switch (action.type) {
        case RIDE_DRAFT_CREATE:
            return Object.assign({}, { rideDraft: action.ride });
        case RIDE_DRAFT_UPDATE:
            return Object.assign({}, { rideDraft: { ...state.rideDraft, ...action.update } });
        case RIDE_DRAFT_DELETE:
            return null;
        case RIDE_ONGOING_CREATE:
            return Object.assign({}, { rideOngoing: action.ride });
        case RIDE_ONGOING_UPDATE:
            return Object.assign({}, { rideOngoing: { ...state.rideOngoing, ...action.update } });
        case RIDE_ONGOING_DELETE:
            return null;
        case RIDE_RATING_CREATE:
            return Object.assign({}, { rideRating: action.ride });
        case RIDE_RATING_DELETE:
            return null;
        default:
            return state;
    }
};