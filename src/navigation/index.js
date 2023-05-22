import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';

import SplashScreen from '../components/pages/t00-splash-screen';
import LoginPage from '../components/pages/t01-login';
import PrivacyPolicies from '../components/pages/t01-privacy-policies';
import TermsOfUse from '../components/pages/t01-terms-of-use';
import AddProfileInfo from '../components/pages/t02-add-profile-info';
import RegisterMotorcycle from '../components/pages/t03-register-motorcycle';

import { USER_ROLE } from '../utils/constants';
import AdminNavigationStack from './admin';
import PassengerNavigationStack from './passenger';
import DriverNavigationStack from './driver';

import { authOnAuthStateChanged } from '../store/services/auth';
import { checkUserData, userLogout } from '../store/actions/user';
import { checkLogsFolder, log } from '../utils/logging';
import { messagingHandleTokenUpdates, messagingRequestPermission, messagingSaveUserToken } from '../store/services/messaging';

const Stack = createNativeStackNavigator();


export default AppNavigationStack = () => {

    const [initializing, setInitializing] = useState(true);

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        checkLogsFolder();
    }, []);

    useEffect(() => {
        messagingRequestPermission();
        const subscriber = authOnAuthStateChanged(
            user => { dispatch(checkUserData(user, () => setInitializing(false))); messagingSaveUserToken(); },
            () => { dispatch(userLogout()); setInitializing(false); }
        );
        messagingHandleTokenUpdates();
        return subscriber;
    }, []);

    if (initializing) return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );

    if (!user?.uid || !user?.role) {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="LoginPage" component={LoginPage} />
                    <Stack.Screen name="PrivacyPolicies" component={PrivacyPolicies} />
                    <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

    if (user?.uid && user?.role && !user?.name) {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="AddProfileInfo" component={AddProfileInfo} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

    if (user?.uid && user?.role && user?.name && user?.role == USER_ROLE.DRIVER && !user?.motorcycle) {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="RegisterMotorcycle" component={RegisterMotorcycle} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

    if (user?.uid && user?.name && user?.role == USER_ROLE.PASSENGER) {
        return (<PassengerNavigationStack />);
    }

    if (user?.uid && user?.name && user?.motorcycle && user?.role == USER_ROLE.DRIVER) {
        return (<DriverNavigationStack />);
    }

    if (user?.uid && user?.name && user?.role == USER_ROLE.ADMIN) {
        return (<AdminNavigationStack />);
    }
};