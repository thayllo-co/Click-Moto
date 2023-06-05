import {
    databaseCompleteRideWaypoint,
    databaseGetAllRidesDetails,
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
import { startWatchingOnlineDrivers, stopWatchingOnlineDrivers } from "./online-drivers";
import { uploadUserData, userUpdate } from "./user";
import { ToastMessage, TT } from "../../components/atoms/toast-message";
import { STATUS_OPTIONS } from "../../utils/constants";
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
export const createOngoingRide = ride => ({ type: RIDE_ONGOING_CREATE, ride });
export const updateOngoingRide = update => ({ type: RIDE_ONGOING_UPDATE, update });
export const deleteOngoingRide = () => ({ type: RIDE_ONGOING_DELETE });


export const calculateRidePrice = rideDistance => async dispatch => {
    log.info("⚛️ calculateRidePrice() ", { rideDistance });
    ToastMessage("Calculando o preço da corrida 💰", TT.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const response = await cloudFunctionCalculateRidePrice(rideDistance);
    if (response?.isSuccessful && response?.fare) {
        log.success("⚛️ calculateRidePrice() ");
        ToastMessage("Preço da corrida calculado com sucesso 💰", TT.SUCCESS);
        dispatch(updateRideDraft({ ridePrice: response?.fare, isChooseItineraryVisible: false }));
        dispatch(userUpdate({ isLoading: false }));
    } else {
        log.error("⚛️ calculateRidePrice() ");
        ToastMessage("Erro ao calcular o preço da corrida 😢", TT.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const createNewRideRequest = (passenger, rideDraft) => async dispatch => {
    log.info("⚛️ createNewRideRequest() ", { passenger, rideDraft });
    ToastMessage("Enviando solicitação de corrida ✨", TT.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const { uid, name, phoneNumber, photoURL, rating } = passenger;
    const response = await cloudFunctionCreateNewRideRequest(uid, { name, phoneNumber, photoURL, rating }, rideDraft);
    if (response?.isSuccessful && response?.ride) {
        log.success("⚛️ createNewRideRequest() ");
        ToastMessage("Solicitação de viagem criada com sucesso ✨", TT.SUCCESS);
        dispatch(createOngoingRide(response.ride));
        dispatch(uploadUserData(uid, { status: STATUS_OPTIONS.SEARCHING, currentRide: response?.ride?.id }));
        dispatch(stopWatchingOnlineDrivers());
        dispatch(startWatchingChangesOnRide(response?.ride?.id));
    } else {
        log.error("⚛️ createNewRideRequest() ");
        ToastMessage("Erro ao criar solicitação de corrida 😢", TT.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const startWatchingChangesOnRide = rideUID => async dispatch => {
    log.info("⚛️ startWatchingChangesOnRide() ", { rideUID });
    return databaseStartWatchingChangesOnRide(rideUID, ride => {
        log.success("⚛️ startWatchingChangesOnRide() ", ride);
        dispatch(updateOngoingRide(ride));
        if (ride?.status === STATUS_OPTIONS.PICKUP || ride?.status === STATUS_OPTIONS.ONGOING || ride?.status === STATUS_OPTIONS.DONE) {
            dispatch(uploadUserData(ride?.passenger, { status: ride?.status }))
        }
    });
};

export const stopWatchingChangesOnRide = rideUID => async dispatch => {
    log.info("⚛️ stopWatchingChangesOnRide() ", { rideUID });
    const response = await databaseStopWatchingChangesOnRide(rideUID);
    if (response.isSuccessful) {
        log.success("⚛️ stopWatchingChangesOnRide()");
        dispatch(deleteOngoingRide());
    } else {
        log.error("⚛️ stopWatchingChangesOnRide()");
    }
};

export const processDriverAcceptance = (driver, ride) => async dispatch => {
    log.info("⚛️ processDriverAcceptance() ", { driver, ride });
    ToastMessage("Enviando de aceitação da corrida ✅", TT.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const { uid, name, phoneNumber, photoURL, rating, motorcycle, currentLocation } = driver;
    const response = await cloudFunctionProcessDriverAcceptance(uid, { uid, name, phoneNumber, photoURL, rating, motorcycle }, currentLocation, ride.id);
    if (response?.isSuccessful) {
        log.success("⚛️ processDriverAcceptance() ");
        ToastMessage("Corrida confirmada ✅", TT.SUCCESS);
        dispatch(createOngoingRide({ ...ride, currentLocation }));
        dispatch(uploadUserData(uid, { status: STATUS_OPTIONS.PICKUP, currentRide: ride.id }));
    } else {
        log.error("⚛️ processDriverAcceptance() ");
        ToastMessage("Não foi possível confirmar a corrida 😢", TT.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const processPassengerCancellation = (userUID, ride) => async dispatch => {
    log.info("⚛️ processPassengerCancellation() ", { userUID, ride });
    ToastMessage("Tentando cancelar a corrida 🚨", TT.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const response = await cloudFunctionProcessPassengerCancellation(ride.id);
    if (response?.isSuccessful) {
        log.success("⚛️ processPassengerCancellation() ");
        ToastMessage("Corrida cancelada com sucesso 🚨", TT.SUCCESS);
        dispatch(stopWatchingChangesOnRide(ride.id));
        dispatch(uploadUserData(userUID, { status: STATUS_OPTIONS.IDLE, currentRide: null }));
        dispatch(createRideDraft(ride));
        dispatch(startWatchingOnlineDrivers());
    } else {
        log.error("⚛️ processPassengerCancellation() ");
        ToastMessage("Erro ao cancelar a corrida 😢", TT.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const getUpdatedRideOngoing = rideUID => async dispatch => {
    log.info("⚛️ getUpdatedRideOngoing() ", { rideUID });
    ToastMessage("Verificando corrida em andamento 🛵💨", TT.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const response = await databaseGetRideOngoing(rideUID);
    if (response?.isSuccessful) {
        log.success("⚛️ getUpdatedRideOngoing() ");
        ToastMessage("Corrida em andamento verificada com sucesso ✅", TT.SUCCESS);
        dispatch(createOngoingRide(response.rideOngoing));
        dispatch(userUpdate({ isLoading: false }));
    } else {
        log.error("⚛️ getUpdatedRideOngoing() ");
        ToastMessage("Erro ao verificar a corrida em andamento 😢", TT.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const startRideOngoing = (driverUID, rideUID) => async dispatch => {
    log.info("⚛️ startRideOngoing() ", { driverUID, rideUID });
    ToastMessage("Recalculando a rota para o destino 📍", TT.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const response = await databaseStartRideOngoing(rideUID);
    if (response?.isSuccessful) {
        log.success("⚛️ startRideOngoing() ");
        ToastMessage("Rota recalculada com sucesso 📍", TT.SUCCESS);
        dispatch(updateOngoingRide({ status: STATUS_OPTIONS.ONGOING }));
        dispatch(uploadUserData(driverUID, { status: STATUS_OPTIONS.ONGOING }));
    } else {
        log.error("⚛️ startRideOngoing() ");
        ToastMessage("Ocorreu um erro ao recalcular rota 😢", TT.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const updateOngoingRideLocation = (rideUID, currentLocation) => async dispatch => {
    log.info("⚛️ updateOngoingRideLocation() ", { rideUID, currentLocation });
    const response = await databaseUpdateCurrentRideLocation(rideUID, currentLocation);
    if (response?.isSuccessful) {
        log.success("⚛️ updateOngoingRideLocation() ");
        dispatch(updateOngoingRide({ currentLocation }));
    } else {
        log.error("⚛️ updateOngoingRideLocation()");
    }
};

export const completeRideWaypoint = rideUID => async dispatch => {
    log.info("⚛️ completeRideWaypoint() ", { rideUID });
    ToastMessage("Confirmando parada 🛑", TT.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const response = await databaseCompleteRideWaypoint(rideUID);
    if (response?.isSuccessful) {
        log.success("⚛️ completeRideWaypoint() ");
        ToastMessage("Parada confirmada ✅", TT.SUCCESS);
        dispatch(updateOngoingRide({ waypoints: STATUS_OPTIONS.DONE }));
        dispatch(userUpdate({ isLoading: false }));
    } else {
        log.error("⚛️ completeRideWaypoint() ");
        ToastMessage("Ocorreu um erro ao confirmar parada 😢", TT.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const finishRide = (rideUID, driverUID, passengerUID, currentLocation) => async dispatch => {
    log.info("⚛️ finishRide() ", { rideUID, driverUID, passengerUID, currentLocation });
    ToastMessage("Finalizando corrida 📍", TT.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const response = await cloudFunctionFinishRide(rideUID, driverUID, passengerUID, currentLocation);
    if (response?.isSuccessful) {
        log.success("⚛️ finishRide() ");
        ToastMessage("Corrida finalizada 📍", TT.SUCCESS);
        dispatch(deleteOngoingRide());
        dispatch(uploadUserData(driverUID, { status: STATUS_OPTIONS.DONE }));
    } else {
        log.error("⚛️ finishRide() ");
        ToastMessage("Ocorreu um erro ao finalizar corrida 😢", TT.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const sendRideRating = (userUID, rideUID, rating) => async dispatch => {
    log.info("⚛️ sendRideRating() ", { userUID, rideUID, rating });
    ToastMessage("Enviando avaliação da corrida ⭐️", TT.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const response = await cloudFunctionMakeRideRating(rideUID, userUID, rating);
    if (response?.isSuccessful) {
        log.success("⚛️ sendRideRating() ");
        ToastMessage("Avaliação da corrida enviada ⭐️", TT.SUCCESS);
        dispatch(uploadUserData(userUID, { status: STATUS_OPTIONS.IDLE, currentRide: null }));
    } else {
        log.error("⚛️ sendRideRating() ");
        ToastMessage("Ocorreu um erro ao avaliar corrida 😢", TT.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const getAllRidesDetails = userUID => async dispatch => {
    log.info("⚛️ getAllRidesDetails() ", { userUID });
    ToastMessage("Atualizando lista de corridas 📥", TT.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const response = await databaseGetAllRidesDetails(userUID);
    if (response?.isSuccessful) {
        log.success("⚛️ getAllRidesDetails() ");
        ToastMessage("Lista de corridas atualizada ✅", TT.SUCCESS);
        dispatch(userUpdate({ isLoading: false, rides: response?.rides }));
    } else {
        log.error("⚛️ getAllRidesDetails() ");
        ToastMessage("Ocorreu um erro ao atualizar lista de corridas 😢", TT.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};

export const getAllRidesEarnings = userUID => async dispatch => {
    log.info("⚛️ getAllRidesEarnings() ", { userUID });
    ToastMessage("Atualizando valores 💰", TT.INFO);
    dispatch(userUpdate({ isLoading: true }));
    const response = await databaseGetAllRidesDetails(userUID);
    const { isSuccessful, rides } = response;
    if (isSuccessful) {
        if (rides != null && rides?.length > 0) {
            const DATE_NOW = new Date();
            const TODAY = DATE_NOW.getDate();
            const THIS_MONTH = DATE_NOW.getMonth();
            const THIS_YEAR = DATE_NOW.getFullYear();
            let todaysRidesQuantity = 0;
            let todaysRidesValue = 0;
            let thisMonthRidesQuantity = 0;
            let thisMonthRidesValue = 0;
            let allRidesQuantity = rides?.length || 0;
            let allRidesValue = 0;
            rides.map((item) => {
                const rideDate = new Date(item.timestamp);
                allRidesValue += parseFloat(item.ridePrice);
                if (rideDate.getFullYear() == THIS_YEAR && rideDate.getMonth() == THIS_MONTH) {
                    thisMonthRidesQuantity++;
                    thisMonthRidesValue += parseFloat(item.ridePrice);
                }
                if (rideDate.getFullYear() == THIS_YEAR && rideDate.getMonth() == THIS_MONTH && rideDate.getDate() == TODAY) {
                    todaysRidesQuantity++;
                    todaysRidesValue += parseFloat(item.ridePrice);
                }
            });
            dispatch(userUpdate({ isLoading: false, todaysRidesQuantity, todaysRidesValue, thisMonthRidesQuantity, thisMonthRidesValue, allRidesQuantity, allRidesValue }));
        }
        dispatch(userUpdate({ isLoading: false }));
        log.success("⚛️ getAllRidesEarnings() ", rides);
        ToastMessage("Valores atualizados ✅", TT.SUCCESS);
    } else {
        log.error("⚛️ getAllRidesEarnings() ");
        ToastMessage("Ocorreu um erro ao atualizar valores das corridas 😢", TT.ERROR);
        dispatch(userUpdate({ isLoading: false }));
    }
};