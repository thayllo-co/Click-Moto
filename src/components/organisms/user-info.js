import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Card from '../templates/card';
import Text from '../atoms/text';
import Button from '../atoms/button';
import callIcon from '../../assets/images/call.png';
import sosIcon from '../../assets/images/sos.png';
import userIcon from '../../assets/images/user-photo.png';
import ConfirmationWindow from '../templates/confirmation-window';

import { getTimeFromNumber } from '../../utils/fuctions';


export default UserInfo = props => {

    const [isStartRideVisible, setIsStartRideVisible] = useState(false);
    const [isMakeWaypointVisible, setIsMakeWaypointVisible] = useState(false);
    const [isEndRideVisible, setIsEndRideVisible] = useState(false);
    const [isCallUserVisible, setIsCallUserVisible] = useState(false);
    const [isCallEmergencyVisible, setIsCallEmergencyVisible] = useState(false);

    return (
        <Card style={styles.cardWrapper}>

            <View style={styles.contentWrapper}>

                <Text paragraph highlight center size="xs" value={"Tempo estimado: " + getTimeFromNumber(props.rideTime) + " minutos"} />

                <View style={styles.userRow}>

                    <View style={styles.photoWrapper}>

                        <IconButton light source={userIcon} size="lg" />

                        <Text light title center size="xs" value="⭐️ 5.0" />

                    </View>

                    <View style={styles.infoWrapper}>

                        <Text light title center size="lg" value="Thayllo Oliveira" lines={1} />

                        <Text light paragraph center size="md" value="Honda - POP100" />

                        <Text light paragraph center size="md" value="ABC1234 - Preta" />

                        <View style={styles.buttonsRow}>

                            <IconButton light source={sosIcon} size="sm" onPress={() => setIsCallEmergencyVisible(!isCallEmergencyVisible)} />

                            <IconButton light source={callIcon} size="sm" onPress={() => setIsCallUserVisible(!isCallUserVisible)} />

                            {!props.isRideStarted &&
                                <Button size="sm" onPress={() => setIsStartRideVisible(!isStartRideVisible)} value="Iniciar" />}

                            {props.isRideStarted && !props.isWaypointsDone &&
                                <Button size="sm" onPress={() => setIsMakeWaypointVisible(!isMakeWaypointVisible)} value="Parada" />}

                            {props.isRideStarted && props.isWaypointsDone &&
                                <Button size="sm" onPress={() => setIsEndRideVisible(!isEndRideVisible)} value="Encerrar" />}

                        </View>

                    </View>

                </View>

            </View>

            <ConfirmationWindow
                message="Você chegou ao endereço do passageiro e deseja seguir para o destino?"
                isVisible={isStartRideVisible}
                confirm={() => console.log("isStartRideVisible")}
                dismiss={() => setIsStartRideVisible(!isStartRideVisible)} />

            <ConfirmationWindow
                message="A parada foi realizada e deseja prosseguir para o destino final?"
                isVisible={isMakeWaypointVisible}
                confirm={() => console.log("isMakeWaypointVisible")}
                dismiss={() => setIsMakeWaypointVisible(!isMakeWaypointVisible)} />

            <ConfirmationWindow
                message="Deseja encerrar a corrida?"
                isVisible={isEndRideVisible}
                confirm={() => console.log("isEndRideVisible")}
                dismiss={() => setIsEndRideVisible(!isEndRideVisible)} />

            <ConfirmationWindow
                message="Deseja ligar para o passageiro?"
                isVisible={isCallUserVisible}
                confirm={() => console.log("isCallUserVisible")}
                dismiss={() => setIsCallUserVisible(!isCallUserVisible)} />

            <ConfirmationWindow
                message="Deseja ligar para a emergência?"
                isVisible={isCallEmergencyVisible}
                confirm={() => console.log("isCallEmergencyVisible")}
                dismiss={() => setIsCallEmergencyVisible(!isCallEmergencyVisible)} />

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
    infoWrapper: {
        flex: 2,
        alignItems: 'flex-start',
        marginTop: 12,
        justifyContent: 'space-between'
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginVertical: 12
    }
});