import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import BackgroundMap from '../../templates/background-map';
import IconButton from '../../molecules/icon-button';
import Menu from '../../organisms/menu';
import RideType from '../../organisms/ride-type';
import RidePrice from '../../organisms/ride-price';
import InputChange from '../../organisms/input-change';
import FinalConfirmation from '../../organisms/final-confirmation';
import SearchingDrivers from '../../organisms/searching-drivers';
import UserInfo from '../../organisms/user-info';
import RatingForm from '../../organisms/rating-form';
import menuIcon from '../../../assets/images/menu.png';
import closeIcon from '../../../assets/images/close.png';
import motoIcon from '../../../assets/images/moto.png';

import {
    createNewRideRequest, createRideDraft, deleteRideDraft, processPassengerCancellation,
    sendRideRating, startWatchingChangesOnRide, stopWatchingChangesOnRide, updateRideDraft
} from '../../../store/actions/ride';
import { uploadUserData } from '../../../store/actions/user';
import { startWatchingOnlineDrivers, stopWatchingOnlineDrivers } from '../../../store/actions/online-drivers';
import { RIDE_STATUS, USER_STATUS } from '../../../utils/constants';
import { log } from '../../../utils/logging';


export default Home = props => {

    // REDUX
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const rideDraft = useSelector(state => state.ride?.rideDraft);
    const rideOngoing = useSelector(state => state.ride?.rideOngoing);
    const onlineDrivers = useSelector(state => state.onlineDrivers);

    // Controladores de componentes de UI
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isRideTypeVisible, setIsRideTypeVisible] = useState(false);

    useEffect(() => {
        if (user?.status === USER_STATUS.IDLE) {
            dispatch(startWatchingOnlineDrivers());
        }
        if (user?.currentRide) {
            dispatch(startWatchingChangesOnRide( user?.currentRide));
        }
        return () => {
            dispatch(stopWatchingOnlineDrivers());
            if (user?.currentRide)
                dispatch(stopWatchingChangesOnRide(user.currentRide));
        };
    }, []);

    return (
        <BackgroundMap>

            {/* menu */}
            {((user?.status == USER_STATUS.IDLE && !rideDraft) || user?.status == USER_STATUS.ONGOING) &&
                <IconButton light size="xs"
                    source={!isMenuVisible ? menuIcon : closeIcon}
                    style={styles.menuIconWrapper}
                    onPress={() => setIsMenuVisible(currValue => !currValue)} />}

            {isMenuVisible &&
                <Menu
                    photoURL={user?.photoURL}
                    name={user?.name}
                    rating={user?.rating}
                    navigation={props.navigation}
                    dismiss={() => setIsMenuVisible(false)} />}

            {/* inicia a solicitação de corrida e janela de selecionar o tipo */}
            {(user?.status == USER_STATUS.IDLE && !rideDraft) &&
                <IconButton light size="md"
                    source={motoIcon}
                    style={styles.motoIconWrapper}
                    onPress={() => setIsRideTypeVisible(!isRideTypeVisible)} />}

            <RideType
                isVisible={isRideTypeVisible}
                toggler={() => setIsRideTypeVisible(!isRideTypeVisible)}
                nextAction={rideType => dispatch(createRideDraft({ rideType, isConfirmPickupLocationVisible: true }))} />

            {/* valor da viagem */}
            {(rideDraft?.ridePrice && !rideDraft?.isRidePriceConfirmed) &&
                <RidePrice
                    value={rideDraft?.ridePrice}
                    backAction={() => dispatch(deleteRideDraft())}
                    nextAction={() => dispatch(updateRideDraft({ isRidePriceConfirmed: true }))} />}

            {/* recebe o valor do troco */}
            {(rideDraft?.isRidePriceConfirmed && !rideDraft?.changeValue) &&
                <InputChange
                    nextAction={changeValue => dispatch(updateRideDraft({ changeValue }))} />}

            {/* confirmação final */}
            {(user?.status == USER_STATUS.IDLE && rideDraft?.ridePrice && rideDraft?.isRidePriceConfirmed && rideDraft?.changeValue) &&
                <FinalConfirmation
                    backAction={() => dispatch(deleteRideDraft())}
                    nextAction={() => dispatch(createNewRideRequest(user?.uid, rideDraft))}
                    noOnlineDrivers={onlineDrivers?.length > 0 ? false : true}
                    ride={rideDraft} />}

            {/* procurando motoristas */}
            {(rideOngoing?.status == RIDE_STATUS.SEARCHING || rideOngoing?.status == RIDE_STATUS.CREATED) &&
                <SearchingDrivers
                    cancel={() => dispatch(processPassengerCancellation(user?.uid, rideOngoing))}
                    driversSearchInfo={rideOngoing?.info || "Carregando dados..."} />}

            {/* informações do usuário */}
            {(rideOngoing?.status == RIDE_STATUS.PICKUP || rideOngoing?.status == RIDE_STATUS.ONGOING) &&
                <UserInfo rideOngoing={rideOngoing} userRole={user?.role} />}

            {/* avaliação da corrida */}
            {(rideOngoing?.status == RIDE_STATUS.DONE) &&
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
