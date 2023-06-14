import { Platform } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

import { GOOGLE_MAPS_API_KEY, LOCATION_OPTIONS } from '../../utils/constants';
import { log } from '../../utils/logging';


// PERMISSIONS

export const mapsRequestLocationPermission = async callback => {
    log.info("🌎 mapsRequestLocationPermission()");
    if (Platform.OS === 'ios') {
        const response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        log.info("🌎 mapsRequestLocationPermission() ", response);
        const result = mapsVerifyPermission(response);
        callback(result);
    } else {
        const response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        log.info("🌎 mapsRequestLocationPermission() ", response);
        const result = mapsVerifyPermission(response);
        callback(result);
    }
}

const mapsVerifyPermission = response => {
    if (response === 'granted') {
        return true;
    } else if (response === 'denied') {
        return false;
    }
}

export const mapsEnableDeviceLocation = callback => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
    })
        .then((response) => {
            log.info("🌎 enableDeviceLocation() ", { response });
            callback(true);
        })
        .catch((error) => {
            log.info("🌎 enableDeviceLocation() ", { error });
            callback(false);
        });
}

// LOCATION SERVICE 

export const mapsStartLocationService = () => Geocoder.init(GOOGLE_MAPS_API_KEY);

export const mapsGetCurrentLocation = async callback => {
    log.info("🌎 mapsGetCurrentLocation()");
    return Geolocation.getCurrentPosition(
        location => {
            log.success("🌎 mapsGetCurrentLocation() ", location);
            const { latitude, longitude } = location.coords;
            callback({ latitude, longitude });
        },
        error => log.error("🌎 mapsGetCurrentLocation() ", error),
        LOCATION_OPTIONS);
}

export const mapsWatchCurrentLocation = async (callback, watchIdCallback) => {
    log.info("🌎 mapsWatchCurrentLocation()");
    watchIdCallback(
        Geolocation.watchPosition(
            location => {
                log.success("🌎 mapsWatchCurrentLocation() ", location);
                const { latitude, longitude } = location.coords;
                callback({ latitude, longitude });
            },
            error => log.error("🌎 mapsWatchCurrentLocation() ", error),
            LOCATION_OPTIONS)
    );
}

export const mapsClearWatchLocation = watchId => {
    log.info("🌎 mapsClearWatchLocation() ", watchId);
    Geolocation.clearWatch(watchId);
};

export const mapsGetLocationTitle = async (latitude, longitude) => {
    log.info("🌎 mapsGetLocationTitle()");
    try {
        const locationDescription = await Geocoder.from(latitude, longitude);
        log.success("🌎 mapsGetLocationTitle() ", locationDescription);
        const address = locationDescription.results[0].formatted_address;
        return address;
    } catch (error) {
        log.error("🌎 mapsGetLocationTitle() ", error)
        return "Ponto selecionado no mapa.";
    }
}