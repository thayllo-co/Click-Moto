import functions from '@react-native-firebase/functions';

import { log } from '../../utils/logging';

const F = {
    CALCULATE_RIDE_PRICE: ((__DEV__) ? "dev" : "prod") + "_CalculateRidePrice",
    CREATE_NEW_RIDE_REQUEST: ((__DEV__) ? "dev" : "prod") + "_CreateNewRideRequest",
    PROCESS_DRIVER_ACCEPTANCE: ((__DEV__) ? "dev" : "prod") + "_ProcessDriverAcceptance",
    PROCESS_PASSENGER_CANCELLATION: ((__DEV__) ? "dev" : "prod") + "_ProcessPassengerCancellation",
    FINISH_RIDE: ((__DEV__) ? "dev" : "prod") + "_FinishRide",
    MAKE_RIDE_RATING: ((__DEV__) ? "dev" : "prod") + "_MakeRideRating",
}

const cloudFunctionExecution = (functionName, functionData) =>
    new Promise((resolve, reject) =>
        functions()
            .httpsCallable(functionName)(functionData)
            .then(response => {
                log.success("🔥 cloudFunctionExecution(" + functionName + ") ", response);
                resolve(response);
            })
            .catch(error => {
                log.error("🔥 cloudFunctionExecution(" + functionName + ") ", error);
                reject(error);
            }));

export const cloudFunctionCalculateRidePrice = async rideDistance => {
    log.info("🔥 cloudFunctionCalculateRidePrice()");
    try {
        const res = await cloudFunctionExecution(F.CALCULATE_RIDE_PRICE, { rideDistance });
        return res.data;
    } catch (error) {
        return { isSuccessful: false };
    }
};

export const cloudFunctionCreateNewRideRequest = async (passenger, passengerInfo, rideDraft) => {
    log.info("🔥 cloudFunctionCreateNewRideRequest()");
    try {
        const res = await cloudFunctionExecution(F.CREATE_NEW_RIDE_REQUEST, { rideDraft, passenger, passengerInfo });
        return res.data;
    } catch (error) {
        return { isSuccessful: false };
    }
};

export const cloudFunctionProcessDriverAcceptance = async (driver, driverInfo, currentLocation, ride) => {
    log.info("🔥 cloudFunctionProcessDriverAcceptance()");
    try {
        const res = await cloudFunctionExecution(F.PROCESS_DRIVER_ACCEPTANCE, { driver, driverInfo, currentLocation, ride });
        return res.data;
    } catch (error) {
        return { isSuccessful: false };
    }
};

export const cloudFunctionProcessPassengerCancellation = async ride => {
    log.info("🔥 cloudFunctionProcessPassengerCancellation()");
    try {
        const res = await cloudFunctionExecution(F.PROCESS_PASSENGER_CANCELLATION, { ride });
        return res.data;
    } catch (error) {
        return { isSuccessful: false };
    }
};

export const cloudFunctionFinishRide = async (ride, driver, passenger, location) => {
    log.info("🔥 cloudFunctionFinishRide()");
    try {
        const res = await cloudFunctionExecution(F.FINISH_RIDE, { ride, driver, passenger, location });
        return res.data;
    } catch (error) {
        return { isSuccessful: false };
    }
};

export const cloudFunctionMakeRideRating = async (ride, uid, rating) => {
    log.info("🔥 cloudFunctionMakeRideRating()");
    try {
        const res = await cloudFunctionExecution(F.MAKE_RIDE_RATING, { ride, uid, rating });
        return res.data;
    } catch (error) {
        return { isSuccessful: false };
    }
};
