import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import BackgroundMap from '../../templates/background-map';
import IconButton from '../../molecules/icon-button';
import Menu from '../../organisms/menu';
import WorkingTimeConfirmation from '../../organisms/working-time-confirmation';
import NewRide from '../../organisms/new-ride';
import UserInfo from '../../organisms/user-info';
import RatingForm from '../../organisms/rating-form';
import menuIcon from '../../../assets/images/menu.png';
import closeIcon from '../../../assets/images/close.png';

import { completeRideWaypoint, finishRide, getUpdatedRideOngoing, processDriverAcceptance, sendRideRating, startRideOngoing, updateOngoingRideLocation } from '../../../store/actions/ride';
import { joinOnlineDrivers, leaveOnlineDrivers, updateOnlineDrivers } from '../../../store/actions/online-drivers';
import { RIDE_STATUS, USER_STATUS } from '../../../utils/constants';
import { log } from '../../../utils/logging';
import Button from '../../atoms/button';


export default Home = props => {

    // REDUX
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const notifications = useSelector(state => state.notifications);
    const rideOngoing = useSelector(state => state.ride?.rideOngoing);

    // Controladores de componentes de UI
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isWorkingTimeConfirmationVisible, setIsWorkingTimeConfirmationVisible] = useState(false);
    const [newRideFound, setNewRideFound] = useState(null);

    useEffect(() => {
        if (user?.currentRide) {
            dispatch(getUpdatedRideOngoing(user?.currentRide));
        }
    }, []);

    useEffect(() => {
        log.info("USER LOCATION CHANGED ", user?.currentLocation);
        if (user?.isOnline && user?.status === USER_STATUS.IDLE) {
            dispatch(updateOnlineDrivers(user?.uid, user?.currentLocation));
        }
        if (user?.currentRide && (user?.status === USER_STATUS.PICKUP || user?.status === USER_STATUS.ONGOING)) {
            dispatch(updateOngoingRideLocation(user?.currentRide, user?.currentLocation));
        }
    }, [user?.currentLocation]);

    useEffect(() => {
        console.log("notifications: ", notifications);
        if (notifications && notifications?.data) {
            const notificationData = JSON.parse(notifications.data.notification);
            console.log("notificationData", notificationData);
            if (notificationData.notificationType == "NEW_RIDE_REQUEST" && user?.status == USER_STATUS.IDLE) {
                setNewRideFound(notificationData);
            }
        }
    }, [notifications]);

    return (
        <BackgroundMap>

            {/* menu */}
            <IconButton light size="xs"
                source={!isMenuVisible ? menuIcon : closeIcon}
                style={styles.menuIconWrapper}
                onPress={() => setIsMenuVisible(!isMenuVisible)} />

            {isMenuVisible &&
                <Menu
                    photoURL={user?.photoURL}
                    name={user?.name}
                    rating={user?.rating}
                    navigation={props.navigation}
                    dismiss={() => setIsMenuVisible(false)} />}

            {/* instruções para verificação */}
            {!user?.isVerified &&
                <Button style={styles.bottomContent}
                    onPress={() => props.navigation.navigate('VerificationInfo')}
                    value="Clique aqui para ler as instruções de como completar o seu cadastro" />}

            {/* ganhos */}
            {user?.isVerified &&
                <Button style={styles.topContent} onPress={() => props.navigation.navigate('Earnings')} value="Ganhos" />}

            {/* expediente */}
            {(user?.status == USER_STATUS.IDLE && user?.isVerified) &&
                <Button style={styles.bottomContent}
                    onPress={() => setIsWorkingTimeConfirmationVisible(true)}
                    value={"Você está " + (user?.isOnline ? "ON" : "OFF") +
                        "\nDeseja " + (!user?.isOnline ? "iniciar?" : "encerrar?")} />}

            {/*  confirmação de expediente */}
            {user?.isVerified &&
                <WorkingTimeConfirmation
                    isVisible={isWorkingTimeConfirmationVisible}
                    toggler={() => setIsWorkingTimeConfirmationVisible(false)}
                    toggleWorkingTime={() => (!user?.isOnline) ? dispatch(joinOnlineDrivers(user?.uid, user?.currentLocation)) : dispatch(leaveOnlineDrivers(user?.uid))}
                    confirmationHeading={user?.isOnline ? "Encerrar expediente?" : "Começar expediente?"}
                    confirmationMessage={user?.isOnline ? "Ao continuar você não irá receber corridas" : "Ao continuar você poderá receber corridas"}
                />}

            {/* janela de nova corrida */}
            <NewRide
                isVisible={newRideFound ? true : false}
                ride={newRideFound}
                toggler={() => setNewRideFound(null)}
                sendRideAcceptance={() => dispatch(processDriverAcceptance(user?.uid, user?.currentLocation, newRideFound))} />

            {/* informações do usuário */}
            {(user?.status == USER_STATUS.PICKUP || user?.status == USER_STATUS.ONGOING) &&
                <UserInfo
                    rideOngoing={rideOngoing}
                    userRole={user?.role}
                    startRide={() => dispatch(startRideOngoing(user?.uid, user?.currentRide))}
                    makeWaypoint={() => dispatch(completeRideWaypoint(user?.currentRide))}
                    endRide={() => dispatch(finishRide(user?.currentRide, user?.uid, rideOngoing?.passenger))} />}

            {/* avaliação da corrida */}
            {(user?.status == RIDE_STATUS.DONE) &&
                <RatingForm
                    nextAction={rating => dispatch(sendRideRating(user?.uid, user?.currentRide, rating))}
                    dismiss={() => {
                        dispatch(stopWatchingChangesOnRide(user?.currentRide));
                        dispatch(uploadUserData(user?.uid, { status: USER_STATUS.IDLE, currentRide: null }));
                    }} />}

        </BackgroundMap>
    );
}

const styles = StyleSheet.create({
    menuIconWrapper: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 30 : 20,
        left: Platform.OS === 'ios' ? 30 : 20,
        zIndex: 9999
    },
    motoIconWrapper: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    topContent: {
        position: 'absolute',
        top: 30
    },
    bottomContent: {
        position: 'absolute',
        bottom: 10
    }
});
