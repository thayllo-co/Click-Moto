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

import { createRideDraft, deleteRideDraft, deleteRideRating, updateRideDraft } from '../../../store/actions/ride';
import { userUpdate } from '../../../store/actions/user';
import { USER_STATUS } from '../../../utils/constants';
import { log } from '../../../utils/logging';


export default Home = props => {

    // REDUX
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const rideDraft = useSelector(state => state.ride?.rideDraft);

    // Controladores de componentes de UI
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isRideTypeVisible, setIsRideTypeVisible] = useState(false);

    useEffect(() => {
        log.info("Home initial hook (componentDidMount)");
    }, []);

    useEffect(() => {
        log.info("USER STATUS CHANGED ", user?.status);
        log.info("MOUNT SCENARIO");
    }, [user?.status]);

    const startRideSearch = () => {
        dispatch(userUpdate({ status: USER_STATUS.SEARCHING, rideDraft }));
    };

    const cancelRideSearch = () => {
        dispatch(userUpdate({ status: USER_STATUS.IDLE, rideDraft: null }));
    };

    return (
        <BackgroundMap>

            {/* menu */}
            {(user?.status == USER_STATUS.IDLE && !rideDraft) &&
                <IconButton light size="xs"
                    source={!isMenuVisible ? menuIcon : closeIcon}
                    style={styles.menuIconWrapper}
                    onPress={() => setIsMenuVisible(!isMenuVisible)} />}

            {isMenuVisible &&
                <Menu
                    photoURL={user?.photoURL}
                    name={user?.name}
                    rating={user?.rating}
                    navigation={props.navigation} 
                    dismiss={() => setIsMenuVisible(false)}/>}

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
                    nextAction={startRideSearch}
                    noOnlineDrivers={false}
                    ride={rideDraft} />}

            {/* procurando motoristas */}
            {(user?.status == USER_STATUS.SEARCHING) &&
                <SearchingDrivers
                    cancel={cancelRideSearch}
                    driversSearchInfo="Progresso 1 de 2 ..." />}

            {/* informações do usuário */}
            {(user?.status == USER_STATUS.ONGOING) &&
                <UserInfo rideTime={10.7} isRideStarted={false} isWaypointsDone={false} />}

            {/* avaliação da corrida */}
            {(user?.status == USER_STATUS.DONE) &&
                <RatingForm
                    nextAction
                    dismiss={() => dispatch(deleteRideRating())} />}

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
