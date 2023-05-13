import { useState } from 'react';
import { StyleSheet, View, Linking } from 'react-native';

import Card from './templates/card';
import Text from '../atoms/text';
import Button from '../atoms/button';
import callIcon from '../../assets/images/call.png';
import sosIcon from '../../assets/images/sos.png';
import userIcon from '../../assets/images/user-photo.png';
import ConfirmationWindow from '../templates/confirmation-window';

import { getTimeFromNumber } from '../../utils/fuctions';
import { STATUS_OPTIONS, USER_ROLE } from '../../utils/constants';
import IconButton from '../molecules/icon-button';
import Image from '../atoms/image';


export default UserInfo = props => {

    const [isStartRideVisible, setIsStartRideVisible] = useState(false);
    const [isMakeWaypointVisible, setIsMakeWaypointVisible] = useState(false);
    const [isEndRideVisible, setIsEndRideVisible] = useState(false);
    const [isCallUserVisible, setIsCallUserVisible] = useState(false);
    const [isCallEmergencyVisible, setIsCallEmergencyVisible] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    return (
        <Card style={styles.cardWrapper}>

            <View style={styles.contentWrapper}>

                <Text paragraph highlight center size="xs" value={"Tempo estimado: " + getTimeFromNumber(props.rideOngoing?.rideTime) + " minutos"} />

                <View style={styles.userRow}>

                    <View style={styles.photoWrapper}>

                        <Image light source={userInfo?.photoURL ? { uri: userInfo?.photoURL } : userIcon} size="lg" style={styles.userPhoto} />

                        <Text light title center size="xs" value={"⭐️" + (userInfo?.rating || 0).toFixed(1)} />

                    </View>

                    <View style={styles.infoWrapper}>

                        <Text light title center size="lg" value={userInfo?.name || "Carregando..."} lines={1} />

                        {props.userRole === USER_ROLE.PASSENGER &&
                            <Text light paragraph center size="lg" value={(userInfo?.motorcycle?.brand + " - " + userInfo?.motorcycle?.model).toUpperCase()} />}

                        {props.userRole === USER_ROLE.PASSENGER &&
                            <Text light paragraph center size="lg" value={(userInfo?.motorcycle?.plate + " - " + userInfo?.motorcycle?.color).toUpperCase()} />}

                        <View style={styles.buttonsRow}>

                            <IconButton light source={sosIcon} size="sm" onPress={() => setIsCallEmergencyVisible(!isCallEmergencyVisible)} />

                            <IconButton light source={callIcon} size="sm" onPress={() => setIsCallUserVisible(!isCallUserVisible)} />

                        </View>

                        {props.userRole === USER_ROLE.DRIVER &&
                            <View style={styles.buttonsRow}>

                                {(props.rideOngoing?.status === STATUS_OPTIONS.CREATED || props.rideOngoing?.status === STATUS_OPTIONS.PICKUP) &&
                                    <Button size="lg" onPress={() => setIsStartRideVisible(!isStartRideVisible)} value="Iniciar Corrida" />}

                                {(props.rideOngoing?.itinerary?.length > 2 && props.rideOngoing?.waypoints !== STATUS_OPTIONS.DONE && props.rideOngoing?.status === STATUS_OPTIONS.ONGOING) &&
                                    <Button size="lg" onPress={() => setIsMakeWaypointVisible(!isMakeWaypointVisible)} value="Completar Parada" />}

                                {((props.rideOngoing?.status === STATUS_OPTIONS.ONGOING) &&
                                    (props.rideOngoing?.itinerary?.length <= 2 || props.rideOngoing?.waypoints === STATUS_OPTIONS.DONE)) &&
                                    <Button size="lg" onPress={() => setIsEndRideVisible(!isEndRideVisible)} value="Encerrar Corrida" />}

                            </View>
                        }

                    </View>

                </View>

            </View>

            <ConfirmationWindow
                message="Você chegou ao endereço do passageiro e deseja seguir para o destino?"
                isVisible={isStartRideVisible}
                confirm={() => { props.startRide(); setIsStartRideVisible(!isStartRideVisible); }}
                dismiss={() => setIsStartRideVisible(false)} />

            <ConfirmationWindow
                message="A parada foi realizada e deseja prosseguir para o destino final?"
                isVisible={isMakeWaypointVisible}
                confirm={() => { props.makeWaypoint(); setIsMakeWaypointVisible(!isMakeWaypointVisible); }}
                dismiss={() => setIsMakeWaypointVisible(false)} />

            <ConfirmationWindow
                message="Deseja encerrar a corrida?"
                isVisible={isEndRideVisible}
                confirm={() => { props.endRide(); setIsEndRideVisible(!isEndRideVisible) }}
                dismiss={() => setIsEndRideVisible(false)} />

            <ConfirmationWindow
                message={`Deseja ligar para o ${props.userRole === USER_ROLE.PASSENGER ? "motorista" : "passageiro"} ?`}
                isVisible={isCallUserVisible}
                confirm={() => { setIsCallUserVisible(false); Linking.openURL(`tel:${userInfo?.phoneNumber}`); }}
                dismiss={() => setIsCallUserVisible(false)} />

            <ConfirmationWindow
                message="Deseja ligar para a emergência?"
                isVisible={isCallEmergencyVisible}
                confirm={() => { setIsCallEmergencyVisible(false); Linking.openURL(`tel:${190}`); }}
                dismiss={() => setIsCallEmergencyVisible(false)} />

        </Card >
    )
};


const styles = StyleSheet.create({
    cardWrapper: {
        padding: 0
    },
    contentWrapper: {
        flex: 1,
        justifyContent: 'space-between'
    },
    userRow: {
        flexDirection: 'row',
        flex: 1,
        paddingTop: 12
    },
    photoWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    userPhoto: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        borderRadius: 150,
        overflow: 'hidden',
    },
    infoWrapper: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginBottom: 12
    }
});