import database from '@react-native-firebase/database';

import { STATUS_OPTIONS } from '../../utils/constants';
import { log } from '../../utils/logging';

const DATABASE_TYPE = { CREATE: "CREATE", READ: "READ", UPDATE: "UPDATE", DELETE: "DELETE", WATCH: "WATCH", DISWATCH: "DISWATCH" };
const environment = (__DEV__) ? "dev" : "prod";
const DB_USERS_PATH = "/users/";
const DB_ONLINE_DRIVERS_PATH = "/onlineDrivers/";
const DB_RIDES_PATH = "/rides/";


const callDatabase = (requestType, databasePath, dataOrCallback) => {
    log.info("🔥 callDatabase(" + requestType + ":" + environment + databasePath + ")");
    switch (requestType) {
        case DATABASE_TYPE.CREATE:
            return database().ref(environment + databasePath).set(dataOrCallback);

        case DATABASE_TYPE.READ:
            return database().ref(environment + databasePath).once('value');

        case DATABASE_TYPE.UPDATE:
            return database().ref(environment + databasePath).update(dataOrCallback);

        case DATABASE_TYPE.DELETE:
            return database().ref(environment + databasePath).remove();

        case DATABASE_TYPE.WATCH:
            return database().ref(environment + databasePath)
                .on('value', snapshot => {
                    if (snapshot.exists())
                        dataOrCallback(snapshot.val());
                    else
                        dataOrCallback(null);
                });

        case DATABASE_TYPE.DISWATCH:
            return database().ref(environment + databasePath).off();

        default:
            return null;
    }
}

export const databaseReadUserData = async uid => {
    log.info("🔥 databaseReadUserData()");
    try {
        const response = await callDatabase(DATABASE_TYPE.READ, DB_USERS_PATH + uid, null);
        log.success("🔥 databaseReadUserData() ", response);
        const user = response.val();
        if (user) {
            return { isSuccessful: true, user };
        } else {
            return { isSuccessful: false };
        }
    } catch (error) {
        log.error("🔥 databaseReadUserData() ", error);
        return { isSuccessful: false };
    }
}

export const databaseUpdateUserData = async (uid, data) => {
    log.info("🔥 databaseUpdateUserData()");
    try {
        await callDatabase(DATABASE_TYPE.UPDATE, DB_USERS_PATH + uid, data);
        log.success("🔥 databaseUpdateUserData()");
        return { isSuccessful: true };
    } catch (error) {
        log.error("🔥 databaseUpdateUserData() ", error);
        return { isSuccessful: false };
    }
}

export const databaseUpdateUserToken = async (uid, token) => {
    log.info("🔥 databaseUpdateUserToken()");
    try {
        await callDatabase(DATABASE_TYPE.UPDATE, DB_USERS_PATH + uid, { token });
        log.success("🔥 databaseUpdateUserToken()");
    } catch (error) {
        log.error("🔥 databaseUpdateUserToken() ", error);
    }
}

export const databaseJoinOnlineDrivers = async (uid, location) => {
    log.info("🔥 databaseJoinOnlineDrivers()");
    try {
        await callDatabase(DATABASE_TYPE.CREATE, DB_ONLINE_DRIVERS_PATH + uid, { uid, location });
        log.success("🔥 databaseJoinOnlineDrivers()");
        return { isSuccessful: true };
    } catch (error) {
        log.error("🔥 databaseJoinOnlineDrivers() ", error);
        return { isSuccessful: false };
    }
}

export const databaseUpdateOnlineDrivers = async (uid, location) => {
    log.info("🔥 databaseUpdateOnlineDrivers()");
    try {
        await callDatabase(DATABASE_TYPE.UPDATE, DB_ONLINE_DRIVERS_PATH + uid, { uid, location });
        log.success("🔥 databaseUpdateOnlineDrivers()");
        return { isSuccessful: true };
    } catch (error) {
        log.error("🔥 databaseUpdateOnlineDrivers() ", error);
        return { isSuccessful: false };
    }
}

export const databaseLeaveOnlineDrivers = async uid => {
    log.info("🔥 databaseLeaveOnlineDrivers()");
    try {
        await callDatabase(DATABASE_TYPE.DELETE, DB_ONLINE_DRIVERS_PATH + uid, null);
        log.success("🔥 databaseLeaveOnlineDrivers()");
        return { isSuccessful: true };
    } catch (error) {
        log.error("🔥 databaseLeaveOnlineDrivers() ", error);
        return { isSuccessful: false };
    }
}

export const databaseStartWatchingOnlineDrivers = async watchCallback => {
    log.info("🔥 databaseStartWatchingOnlineDrivers()");
    return callDatabase(DATABASE_TYPE.WATCH, DB_ONLINE_DRIVERS_PATH, watchCallback);
}

export const databaseStopWatchingOnlineDrivers = async () => {
    log.info("🔥 databaseStopWatchingOnlineDrivers()");
    try {
        await callDatabase(DATABASE_TYPE.DISWATCH, DB_ONLINE_DRIVERS_PATH, null);
        log.success("🔥 databaseStopWatchingOnlineDrivers()");
        return { isSuccessful: true };
    } catch (error) {
        log.error("🔥 databaseStopWatchingOnlineDrivers() ", error);
        return { isSuccessful: false };
    }
}

export const databaseStartWatchingChangesOnRide = async (rideUID, watchCallback) => {
    log.info("🔥 databaseStartWatchingChangesOnRide()");
    return callDatabase(DATABASE_TYPE.WATCH, DB_RIDES_PATH + rideUID, watchCallback);
}

export const databaseStopWatchingChangesOnRide = async rideUID => {
    log.info("🔥 databaseStopWatchingChangesOnRide()");
    try {
        await callDatabase(DATABASE_TYPE.DISWATCH, DB_RIDES_PATH + rideUID, null);
        log.success("🔥 databaseStopWatchingChangesOnRide()");
        return { isSuccessful: true };
    } catch (error) {
        log.error("🔥 databaseStopWatchingChangesOnRide() ", error);
        return { isSuccessful: false };
    }
}

export const databaseGetRideOngoing = async rideUID => {
    log.info("🔥 databaseGetRideOngoing()");
    try {
        const response = await callDatabase(DATABASE_TYPE.READ, DB_RIDES_PATH + rideUID, null);
        log.success("🔥 databaseGetRideOngoing()");
        const rideOngoing = response.val();
        return { isSuccessful: true, rideOngoing };
    } catch (error) {
        log.error("🔥 databaseGetRideOngoing() ", error);
        return { isSuccessful: false };
    }
}

export const databaseStartRideOngoing = async rideUID => {
    log.info("🔥 databaseStartRideOngoing()");
    try {
        await callDatabase(DATABASE_TYPE.UPDATE, DB_RIDES_PATH + rideUID, { status: STATUS_OPTIONS.ONGOING });
        log.success("🔥 databaseStartRideOngoing()");
        return { isSuccessful: true };
    } catch (error) {
        log.error("🔥 databaseStartRideOngoing() ", error);
        return { isSuccessful: false };
    }
}

export const databaseUpdateCurrentRideLocation = async (rideUID, currentLocation) => {
    log.info("🔥 databaseUpdateCurrentRideLocation()");
    try {
        await callDatabase(DATABASE_TYPE.UPDATE, DB_RIDES_PATH + rideUID, { currentLocation });
        log.success("🔥 databaseUpdateCurrentRideLocation()");
        return { isSuccessful: true };
    } catch (error) {
        log.error("🔥 databaseUpdateCurrentRideLocation() ", error);
        return { isSuccessful: false };
    }
}

export const databaseCompleteRideWaypoint = async rideUID => {
    log.info("🔥 databaseCompleteRideWaypoint()");
    try {
        await callDatabase(DATABASE_TYPE.UPDATE, DB_RIDES_PATH + rideUID, { waypoints: STATUS_OPTIONS.DONE });
        log.success("🔥 databaseCompleteRideWaypoint()");
        return { isSuccessful: true };
    } catch (error) {
        log.error("🔥 databaseCompleteRideWaypoint() ", error);
        return { isSuccessful: false };
    }
}

export const databaseGetAllRidesDetails = async uid => {
    log.info("🔥 databaseGetAllRidesDetails()");
    try {
        const response = await callDatabase(DATABASE_TYPE.READ, DB_USERS_PATH + uid + "/rides", null);
        log.success("🔥 databaseGetAllRidesDetails()");
        const rides = response.val();
        let ridesDetails = [];
        if (rides) {
            for (var i in rides) {
                const rideUID = rides[i]?.rideUID;
                const fullRide = await callDatabase(DATABASE_TYPE.READ, DB_RIDES_PATH + rideUID, null);
                const { itinerary, ridePrice, timestamp } = fullRide.val();
                ridesDetails.push({ itinerary, ridePrice, timestamp });
            }
        }
        return { isSuccessful: true, rides: ridesDetails };
    } catch (error) {
        log.error("🔥 databaseGetAllRidesDetails() ", error);
        return { isSuccessful: false };
    }
}