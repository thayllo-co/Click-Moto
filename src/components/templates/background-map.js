import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import Text from '../atoms/text';
import Button from '../atoms/button';
import LoadingIndicator from '../atoms/progress-indicator';
import IconButton from '../molecules/icon-button';
import MapImageMarker from '../molecules/map-image-marker';
import MapInputPlace from '../molecules/map-input-place';
import ConfirmPickupLocation from '../organisms/confirm-pickup-location';
import ManageRideItinerary from '../organisms/manage-ride-itinerary';
import compassIcon from '../../assets/images/compass.png';

import {
    mapsClearWatchLocation, mapsGetCurrentLocation, mapsGetLocationTitle,
    mapsRequestLocationPermission, mapsStartLocationService, mapsWatchCurrentLocation
} from '../../store/services/maps';
import { calculateRidePrice, deleteRideDraft, updateRideDraft } from '../../store/actions/ride';
import { userUpdate } from '../../store/actions/user';
import { GOOGLE_MAPS_API_KEY, MAXIMUM_LOCATIONS_PER_RIDE, USER_STATUS } from '../../utils/constants';
import { GOOGLE_MAPS_DARK_THEME } from '../../theme/maps';
import colors from '../../theme/colors';
import { ToastMessage, TYPE } from '../atoms/toast-message';
import { log } from '../../utils/logging';



export default BackgroundMap = props => {

    const mapRef = useRef(null);
    const [region, setRegion] = useState(null);

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const rideDraft = useSelector(state => state.ride?.rideDraft);

    const updateMapsPermission = isMapsPermissionGranted => dispatch(userUpdate({ isMapsPermissionGranted }));
    const updateUserCurrentLocation = currentLocation => dispatch(userUpdate({ currentLocation }));
    const updateLocationWatcherId = locationWatcherId => dispatch(userUpdate({ locationWatcherId }));

    useEffect(() => {
        mapsStartLocationService();
        mapsRequestLocationPermission(updateMapsPermission);
        return () => mapsClearWatchLocation(user?.locationWatcherId);
    }, []);

    useEffect(() => {
        if (user?.isMapsPermissionGranted) {
            mapsGetCurrentLocation(updateUserCurrentLocation);
            mapsWatchCurrentLocation(updateUserCurrentLocation, updateLocationWatcherId);
        }
    }, [user?.isMapsPermissionGranted]);

    useEffect(() => {
        if (user?.currentLocation && !rideDraft) {
            focusMapZoomOut();
        }
    }, [user?.currentLocation]);

    useEffect(() => {
        if (user?.status == USER_STATUS.IDLE && rideDraft == null)
            focusMapZoomOut();
        if (rideDraft?.isConfirmPickupLocationVisible)
            focusMapZoomIn();
    }, [rideDraft]);

    onMapDidMount = () => {
        log.info("onMapDidMount");
        if (user?.currentLocation == null)
            mapsGetCurrentLocation(updateUserCurrentLocation);
    };

    focusMapZoomOut = () => {
        mapRef.current?.animateToRegion({ ...user?.currentLocation, latitudeDelta: 0.08, longitudeDelta: 0.04 });
    };

    focusMapZoomIn = () => {
        mapRef.current?.animateToRegion({ ...user?.currentLocation, latitudeDelta: 0.0040, longitudeDelta: 0.0023 });
    };

    focusMapOnDirections = () => {
        mapRef.current?.fitToElements({ edgePadding: { right: 25, left: 25, top: 25, bottom: 25 } });
    };

    handlePickupLocation = async () => {
        const { longitude, latitude } = region;
        const locationTitle = await mapsGetLocationTitle(latitude, longitude);
        const details = { geometry: { location: { lat: latitude, lng: longitude } }, name: locationTitle };
        handleLocationSelected(0, details);
        dispatch(updateRideDraft({ isConfirmPickupLocationVisible: false, isChooseItineraryVisible: true }));
    };

    handleLocationSelected = (index, details) => {
        var newItinerary = Object.assign([], rideDraft?.itinerary);
        newItinerary[index] = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            title: details.name
        }
        dispatch(updateRideDraft({ itinerary: newItinerary }));
        if (newItinerary.length == 1)
            handleLocationAdded();
    };

    handleLocationAdded = () => {
        if (rideDraft?.itinerary[rideDraft?.itinerary.length - 1] === null) {
            ToastMessage('Preencha corretamente os campos para adicionar uma padada extra', TYPE.ERROR);
        } else if (rideDraft?.itinerary.length < MAXIMUM_LOCATIONS_PER_RIDE) {
            let newItinerary = Object.assign([], rideDraft?.itinerary);
            newItinerary.push(null);
            dispatch(updateRideDraft({ itinerary: newItinerary }));
        } else {
            ToastMessage('Máximo de paradas atingido', TYPE.ERROR);
        }
    };

    handleLocationRemoved = () => {
        if (rideDraft?.itinerary.length > 2) {
            let newItinerary = Object.assign([], rideDraft?.itinerary);
            newItinerary.pop();
            dispatch(updateRideDraft({ itinerary: newItinerary }));
        } else {
            ToastMessage('Mínimo de paradas atingido', TYPE.ERROR);
        }
    };

    handleDirections = result => {
        dispatch(updateRideDraft({ rideDistance: result.distance.toFixed(2), rideTime: result.duration.toFixed(2) }));
        const clenedItinerary = getClenedItinerary();
        if (clenedItinerary.length >= 2) {
            focusMapOnDirections();
        }
    };

    saveRideItinerary = () => {
        const clenedItinerary = getClenedItinerary();
        if (clenedItinerary.length >= 2) {
            dispatch(updateRideDraft({ itinerary: clenedItinerary }));
            dispatch(calculateRidePrice(rideDraft?.rideDistance));
        } else {
            ToastMessage('Preencha os campos corretamente para continuar', TYPE.ERROR);
        }
    };

    getClenedItinerary = () => {
        const clenedItinerary = rideDraft?.itinerary.filter(element => { return element !== null; });
        return clenedItinerary;
    }

    return (
        <View style={styles.maxContent}>

            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.maxContent}
                onMapReady={onMapDidMount}
                onRegionChange={region => setRegion(region)}
                ref={mapRef}
                customMapStyle={GOOGLE_MAPS_DARK_THEME}
                showsUserLocation={true}
                loadingEnabled={true}
                showsMyLocationButton={false}
                moveOnMarkerPress={false}
            >

                {(user?.isCurrentLocationVisible && user?.currentLocation) &&
                    <Marker coordinate={user?.currentLocation}>
                        <MapImageMarker />
                    </Marker>
                }

                {(rideDraft?.isConfirmPickupLocationVisible && region) &&
                    <Marker coordinate={region}>
                        <MapImageMarker />
                    </Marker>
                }

                {rideDraft?.itinerary?.length >= 2 &&
                    <MapViewDirections
                        origin={rideDraft?.itinerary[0]}
                        destination={rideDraft?.itinerary[rideDraft?.itinerary.length - 1] || rideDraft?.itinerary[rideDraft?.itinerary.length - 2]}
                        waypoints={(rideDraft?.itinerary.length > 2) ? rideDraft?.itinerary.slice(1, -1) : undefined}
                        onReady={result => handleDirections(result)}
                        optimizeWaypoints={true}
                        apikey={GOOGLE_MAPS_API_KEY}
                        strokeWidth={4}
                        strokeColor={colors.primary}
                    />
                }

                {rideDraft?.itinerary?.length >= 2 &&
                    rideDraft?.itinerary.map((location, index) =>
                        location != null ?
                            <Marker
                                key={index}
                                coordinate={location}
                                title={(index + 1) + "º - " + location.title}>
                                <MapImageMarker />
                            </Marker> : null
                    )
                }

            </MapView>

            {!rideDraft &&
                <IconButton source={compassIcon} size="xs" style={styles.compassIcon}
                    onPress={() => mapsGetCurrentLocation(updateUserCurrentLocation)} />}

            {(rideDraft?.isLoading || user?.isLoading || !user?.isMapsPermissionGranted) &&
                <View style={styles.loadingLayer}>
                    {rideDraft?.isLoading &&
                        <LoadingIndicator style={styles.loading} />}
                    {!user?.isMapsPermissionGranted &&
                        <Text light title center bold size="md" value="⚠️ AVISO ⚠️" />}
                    {!user?.isMapsPermissionGranted &&
                        <Text light title center size="xs" value="Você precisa conceder permissão de localização para continuar" />}
                    {!user?.isMapsPermissionGranted &&
                        <Button size="md" onPress={() => mapsRequestLocationPermission(updateMapsPermission)} value="Tentar novamente" />}
                </View>
            }

            {rideDraft?.isConfirmPickupLocationVisible &&
                <ConfirmPickupLocation
                    backAction={() => dispatch(deleteRideDraft())}
                    nextAction={handlePickupLocation} />
            }

            {(rideDraft?.isChooseItineraryVisible && rideDraft?.itinerary.length >= 0) &&
                rideDraft?.itinerary.map((data, index) =>
                    <MapInputPlace
                        key={index}
                        onLocationSelected={handleLocationSelected}
                        index={index}
                        location={data} />)
            }

            {rideDraft?.isChooseItineraryVisible &&
                <ManageRideItinerary
                    addLocation={handleLocationAdded}
                    removeLocation={handleLocationRemoved}
                    backAction={() => dispatch(deleteRideDraft())}
                    nextAction={saveRideItinerary}
                />
            }

            {props.children}

        </View>
    );
}

const styles = StyleSheet.create({
    maxContent: {
        flex: 1
    },
    loadingLayer: {
        backgroundColor: colors.loadingLayer,
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 999,
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    },
    loading: {
        zIndex: 9999,
    },
    compassIcon: {
        position: 'absolute',
        bottom: 250,
        left: 12,
    },
    pinIcon: {
        height: 100,
        width: 100
    }
});