import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import SplashScreen from '../components/pages/t00-splash-screen';
import LoginPage from '../components/pages/t01-login';
import PrivacyPolicies from '../components/pages/t01-privacy-policies';
import TermsOfUse from '../components/pages/t01-terms-of-use';
import AddProfileInfo from '../components/pages/t02-add-profile-info';
import RegisterMotorcycle from '../components/pages/t03-register-motorcycle';

import { ADMIN_ROLE, DRIVER_ROLE, PASSENGER_ROLE } from '../utils/constants';
import AdminNavigationStack from './admin';
import PassengerNavigationStack from './passenger';
import DriverNavigationStack from './driver';

const Stack = createNativeStackNavigator();


export default AppNavigationStack = () => {

    const [initializing, setInitializing] = useState(true);

    const state = useSelector(state => state);
    const user = useSelector(state => state.user);

    useEffect(() => {
        console.log("state: ", state);
    }, [state]);

    useEffect(() => {
        setTimeout(() => {
            setInitializing(false);
        }, 5000);
    }, []);

    if (initializing) return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );

    if (!user?.verificationCode) {
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

    if (!user?.name) {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="AddProfileInfo" component={AddProfileInfo} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

    if (user?.role == DRIVER_ROLE && !user?.motorcycle) {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="RegisterMotorcycle" component={RegisterMotorcycle} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

    if (user?.role == PASSENGER_ROLE) {
        return (<PassengerNavigationStack />);
    }

    if (user?.role == DRIVER_ROLE) {
        return (<DriverNavigationStack />);
    }

    if (user?.role == ADMIN_ROLE) {
        return (<AdminNavigationStack />);
    }
};