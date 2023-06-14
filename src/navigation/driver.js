import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';

import Welcome from '../components/pages/t04-welcome';
import Home from '../components/pages/driver/home';
import RidesHistory from '../components/pages/t05-rides-history';
import Support from '../components/pages/t06-support';
import SendMessage from '../components/pages/t07-send-message';
import PrivacyPolicies from '../components/pages/t01-privacy-policies';
import TermsOfUse from '../components/pages/t01-terms-of-use';
import Settings from '../components/pages/t08-settings';
import VerificationInfo from '../components/pages/driver/verification-info';
import Earnings from '../components/pages/driver/earnigs';

import { updateOnlineDrivers } from '../store/actions/online-drivers';
import { updateOngoingRideLocation } from '../store/actions/ride';
import { STATUS_OPTIONS } from '../utils/constants';
import { log } from '../utils/logging';

const Stack = createNativeStackNavigator();


export default DriverNavigationStack = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect(() => {
        log.info("DRIVER LOCATION CHANGED ", user?.currentLocation);
        if (user?.isOnline && user?.status === STATUS_OPTIONS.IDLE) {
            dispatch(updateOnlineDrivers(user?.uid, user?.currentLocation));
        }
        if (user?.currentRide && (user?.status === STATUS_OPTIONS.PICKUP || user?.status === STATUS_OPTIONS.ONGOING)) {
            dispatch(updateOngoingRideLocation(user?.currentRide, user?.currentLocation));
        }
    }, [user?.currentLocation]);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!user?.isVerified && <Stack.Screen name="Welcome" component={Welcome} />}
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="RidesHistory" component={RidesHistory} />
                <Stack.Screen name="Support" component={Support} />
                <Stack.Screen name="SendMessage" component={SendMessage} />
                <Stack.Screen name="PrivacyPolicies" component={PrivacyPolicies} />
                <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="VerificationInfo" component={VerificationInfo} />
                <Stack.Screen name="Earnings" component={Earnings} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};