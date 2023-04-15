import { ToastMessage, TYPE } from "../../components/atoms/toast-message";
import passenger from "../../navigation/passenger";
import { RIDE_STATUS, USER_STATUS } from "../../utils/constants";
import { log } from "../../utils/logging";
import {
    databaseCompleteRideWaypoint,
    databaseGetRideOngoing,
    databaseStartRideOngoing,
    databaseStartWatchingChangesOnRide,
    databaseStopWatchingChangesOnRide,
    databaseUpdateCurrentRideLocation
} from "../services/database";
import {
    cloudFunctionCalculateRidePrice,
    cloudFunctionCreateNewRideRequest,
    cloudFunctionFinishRide,
    cloudFunctionMakeRideRating,
    cloudFunctionProcessDriverAcceptance,
    cloudFunctionProcessPassengerCancellation
} from "../services/funcions";
import { uploadUserData, userUpdate } from "./user";

export const RIDE_DRAFT_CREATE = 'RIDE_DRAFT_CREATE';
export const RIDE_DRAFT_UPDATE = 'RIDE_DRAFT_UPDATE';
export const RIDE_DRAFT_DELETE = 'RIDE_DRAFT_DELETE';
export const createRideDraft = ride => ({ type: RIDE_DRAFT_CREATE, ride });
export const updateRideDraft = update => ({ type: RIDE_DRAFT_UPDATE, update });
export const deleteRideDraft = () => ({ type: RIDE_DRAFT_DELETE });

export const RIDE_ONGOING_CREATE = 'RIDE_ONGOING_CREATE';
export const RIDE_ONGOING_UPDATE = 'RIDE_ONGOING_UPDATE';
export const RIDE_ONGOING_DELETE = 'RIDE_ONGOING_DELETE';
export const createOngoingRide = ride => ({ type: RIDE_ONGOING_CREATE, ride });
export const updateOngoingRide = update => ({ type: RIDE_ONGOING_UPDATE, update });
export const deleteOngoingRide = () => ({ type: RIDE_ONGOING_DELETE });

export const calculateRidePrice = rideDistance => async dispatch => {
    // testar valores recebidos aqui 
    log.info("⚛️ calculateRidePrice() ", { rideDistance });
    ToastMessage("Calculando o preço da corrida 💰", TYPE.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const response = await cloudFunctionCalculateRidePrice(rideDistance);
    if (response?.isSuccessful && response?.fare) {
        dispatch(updateRideDraft({ ridePrice: response?.fare }));
        dispatch(userUpdate({ isLoading: false }));
    } else {
        ToastMessage("Ocorreu um erro inesperado 😢", TYPE.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const createNewRideRequest = (userUID, rideDraft) => async dispatch => {
    log.info("⚛️ createNewRideRequest() ", { userUID, rideDraft });
    ToastMessage("Enviando solicitação de corrida ✨", TYPE.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const response = await cloudFunctionCreateNewRideRequest(userUID, rideDraft);
    if (response?.isSuccessful && response?.ride) {
        dispatch(createOngoingRide(response.ride));
        dispatch(uploadUserData(userUID, { status: USER_STATUS.SEARCHING, currentRide: response?.ride?.id }));
        dispatch(startWatchingChangesOnRide(response?.ride?.id));
    } else {
        ToastMessage("Ocorreu um erro inesperado 😢", TYPE.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const startWatchingChangesOnRide =  rideUID => async dispatch => {
    log.info("⚛️ startWatchingChangesOnRide() ", { rideUID });
    return databaseStartWatchingChangesOnRide(rideUID, ride => {
        log.success("⚛️ startWatchingChangesOnRide() ", ride);
        dispatch(updateOngoingRide(ride));
    });
};

export const stopWatchingChangesOnRide = rideUID => async dispatch => {
    log.info("⚛️ stopWatchingChangesOnRide() ", { rideUID });
    return databaseStopWatchingChangesOnRide(rideUID, () => {
        log.success("⚛️ stopWatchingChangesOnRide() ", rideUID);
        dispatch(deleteOngoingRide());
    });
};

export const processPassengerCancellation = (userUID, ride) => async dispatch => {
    log.info("⚛️ processPassengerCancellation() ", { userUID, ride });
    ToastMessage("Tentando cancelar a corrida 🚨", TYPE.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const response = await cloudFunctionProcessPassengerCancellation(ride.id);
    if (response?.isSuccessful) {
        dispatch(stopWatchingChangesOnRide(ride.id));
        dispatch(uploadUserData(userUID, { status: USER_STATUS.IDLE, currentRide: null }));
        dispatch(createRideDraft(ride));
    } else {
        ToastMessage("Ocorreu um erro inesperado 😢", TYPE.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const processDriverAcceptance = (driverUID, driverCurrentLocation, ride) => async dispatch => {
    log.info("⚛️ processDriverAcceptance() ", { driverUID, driverCurrentLocation, ride });
    ToastMessage("Enviando de aceitação da corrida ✅", TYPE.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const response = await cloudFunctionProcessDriverAcceptance(driverUID, driverCurrentLocation, ride.id);
    if (response?.isSuccessful) {
        dispatch(createOngoingRide(ride));
        dispatch(uploadUserData(driverUID, { status: USER_STATUS.PICKUP, currentRide: ride.id }));
    } else {
        ToastMessage("Ocorreu um erro inesperado 😢", TYPE.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const getUpdatedRideOngoing = rideUID => async dispatch => {
    log.info("⚛️ getUpdatedRideOngoing() ", { rideUID });
    dispatch(userUpdate({ isLoading: true }));
    const response = await databaseGetRideOngoing(rideUID);
    if (response?.isSuccessful) {
        dispatch(createOngoingRide(response.rideOngoing));
        dispatch(userUpdate({ isLoading: false }));
    } else {
        ToastMessage("Ocorreu um erro inesperado 😢", TYPE.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const startRideOngoing = (driverUID, rideUID) => async dispatch => {
    log.info("⚛️ startRideOngoing() ", { driverUID, rideUID });
    ToastMessage("Recalculando a rota para o destino 📍", TYPE.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const response = await databaseStartRideOngoing(rideUID);
    if (response?.isSuccessful) {
        dispatch(updateOngoingRide({ status: RIDE_STATUS.ONGOING }));
        dispatch(uploadUserData(driverUID, { status: USER_STATUS.ONGOING }));
    } else {
        ToastMessage("Ocorreu um erro inesperado 😢", TYPE.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const updateOngoingRideLocation = (rideUID, currentLocation) => async dispatch => {
    log.info("⚛️ updateOngoingRideLocation() ", { rideUID, currentLocation });
    const response = await databaseUpdateCurrentRideLocation(rideUID, currentLocation);
    if (response?.isSuccessful) {
        dispatch(updateOngoingRide({ currentLocation }));
    } else {
        log.error("⚛️ updateOngoingRideLocation()");
    }
};

export const completeRideWaypoint = rideUID => async dispatch => {
    log.info("⚛️ completeRideWaypoint() ", { rideUID });
    ToastMessage("Confirmando parada 🛑", TYPE.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const response = await databaseCompleteRideWaypoint(rideUID);
    if (response?.isSuccessful) {
        dispatch(updateOngoingRide({ waypoints: USER_STATUS.DONE }));
    } else {
        ToastMessage("Ocorreu um erro inesperado 😢", TYPE.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const finishRide = (rideUID, driverUID, passengerUID) => async dispatch => {
    log.info("⚛️ finishRide() ", {rideUID, driverUID, passengerUID});
    ToastMessage("Finalizando corrida 📍", TYPE.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const response = await cloudFunctionFinishRide(rideUID, driverUID, passengerUID);
    if (response?.isSuccessful) {
        dispatch(deleteOngoingRide());
        dispatch(uploadUserData(driverUID, { status: USER_STATUS.DONE }));
    } else {
        ToastMessage("Ocorreu um erro inesperado 😢", TYPE.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const sendRideRating = (userUID, rideUID, rating) => async dispatch => {
    log.info("⚛️ sendRideRating() ", { userUID, rideUID, rating });
    ToastMessage("Enviando avaliação da viagem ⭐️", TYPE.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const response = await cloudFunctionMakeRideRating(rideUID, userUID, rating);
    if (response?.isSuccessful) {
        dispatch(stopWatchingChangesOnRide(rideUID));
        dispatch(uploadUserData(userUID, { status: USER_STATUS.IDLE, currentRide: null }));
    } else {
        ToastMessage("Ocorreu um erro inesperado 😢", TYPE.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};