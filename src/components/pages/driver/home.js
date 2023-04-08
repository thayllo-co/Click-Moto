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

import { deleteRideRating } from '../../../store/actions/ride';
import { userUpdate } from '../../../store/actions/user';
import { USER_STATUS } from '../../../utils/constants';
import { log } from '../../../utils/logging';
import Button from '../../atoms/button';


export default Home = props => {

    // REDUX
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    // Controladores de componentes de UI
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isNewRideVisible, setIsNewRideVisible] = useState(false);
    const [isWorkingTimeConfirmationVisible, setIsWorkingTimeConfirmationVisible] = useState(false);

    useEffect(() => {
        log.info("Home initial hook (componentDidMount)");
    }, []);

    useEffect(() => {
        log.info("USER STATUS CHANGED ", user?.status);
        log.info("MOUNT SCENARIO");
    }, [user?.status]);


    const startWorkingTime = () => {
        setIsWorkingTimeConfirmationVisible(false);
        console.log("START WORKING");
    }

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
            {user?.isVerified &&
                <Button style={styles.bottomContent}
                    onPress={() => setIsWorkingTimeConfirmationVisible(true)}
                    value={"Você está " + (user?.isOnline ? "ON" : "OFF") +
                        "\nDeseja " + (!user?.isOnline ? "iniciar?" : "encerrar?")} />}

            {/*  confirmação de expediente */}
            {user?.isVerified &&
                <WorkingTimeConfirmation
                    isVisible={isWorkingTimeConfirmationVisible}
                    toggler={() => setIsWorkingTimeConfirmationVisible(false)}
                    startWorking={startWorkingTime}
                    confirmationHeading={user?.isOnline ? "Encerrar expediente?" : "Começar expediente?"}
                    confirmationMessage={user?.isOnline ? "Ao continuar você não irá receber corridas" : "Ao continuar você poderá receber corridas"}
                />}

            {/* janela de nova corrida */}
            <NewRide
                isVisible={isNewRideVisible}
                toggler={() => setIsNewRideVisible(false)}
                rideTime={1.23}
                rideDistance={7.3244}
                rideValue={10.80}
                changeValue={50} />

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
