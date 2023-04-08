import { log } from "../../utils/logging";

export const RIDE_DRAFT_CREATE = 'RIDE_DRAFT_CREATE';
export const RIDE_DRAFT_UPDATE = 'RIDE_DRAFT_UPDATE';
export const RIDE_DRAFT_DELETE = 'RIDE_DRAFT_DELETE';
export const createRideDraft = ride => ({ type: RIDE_DRAFT_CREATE, ride });
export const updateRideDraft = update => ({ type: RIDE_DRAFT_UPDATE, update });
export const deleteRideDraft = () => ({ type: RIDE_DRAFT_DELETE });

export const RIDE_ONGOING_CREATE = 'RIDE_ONGOING_CREATE';
export const RIDE_ONGOING_UPDATE = 'RIDE_ONGOING_UPDATE';
export const RIDE_ONGOING_DELETE = 'RIDE_ONGOING_DELETE';
export const createCurrentRide = ride => ({ type: RIDE_ONGOING_CREATE, ride });
export const updateCurrentRide = update => ({ type: RIDE_ONGOING_UPDATE, update });
export const deleteCurrentRide = () => ({ type: RIDE_ONGOING_DELETE });

export const RIDE_RATING_CREATE = 'RIDE_RATING_CREATE';
export const RIDE_RATING_DELETE = 'RIDE_RATING_DELETE';
export const createRideRating = ride => ({ type: RIDE_ONGOING_CREATE, ride });
export const deleteRideRating = () => ({ type: RIDE_ONGOING_DELETE });

export const calculateRidePrice = rideDistance => async dispatch => {
    log.info("⚛️ calculateRidePrice() ", rideDistance);
    dispatch(updateRideDraft({ isLoading: true }));
    setTimeout(() => {
        const ridePrice = 10.8;
        dispatch(updateRideDraft({ ridePrice, isLoading: false, isChooseItineraryVisible: false }));
    }, 5000);
    // const response = await authSignInWithPhoneNumber(phone);
    // if (response.itSucceed) {
    //     dispatch(userUpdate({ confirmation: response.confirmation, isLoading: false }));
    // } else {
    //     dispatch(userUpdate({ isLoading: false }));
    // }
};
export const createNewRideRequest = () => async dispatch => { log.info("⚛️ createNewRideRequest() "); };
export const processPassengerCancellation = () => async dispatch => { log.info("⚛️ processPassengerCancellation() "); };
// export const sendRideRequestToDrivers =  () => async dispatch =>{log.info("⚛️ sendRideRequestToDrivers() ");};
export const processDriverAcceptance = () => async dispatch => { log.info("⚛️ processDriverAcceptance() "); };
export const watchOngoingRide = () => async dispatch => { log.info("⚛️ updatetOngoingRide() "); };
export const updatetOngoingRide = () => async dispatch => { log.info("⚛️ updatetOngoingRide() "); };
export const endRide = () => async dispatch => { log.info("⚛️ endRide() "); };
export const sendRideRating = () => async dispatch => { log.info("⚛️ sendRideRating() "); };

// IDLE - D & P
// RIDE_DRAFT - P
// CalculateRidePrice()
// SEARCHING - P
// CreateNewRideRequest()
// CANCELED - P
// ProcessPassengerCancellation()
// NEW_RIDE - D
// SendRideRequestToDrivers()
// PICKUP - D
// ProcessDriverAcceptance()
// PICKUP - P
// ONGOING - D & P
// updateCurrentRide()
// DONE - D & P
// FinishRide() - D
// MakeRideEvaluation() - D & P
