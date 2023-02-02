import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../components/pages/t00-splash-screen';
import LoginPage from '../components/pages/t01-login';
import PrivacyPolicies from '../components/pages/t01-privacy-policies';
import TermsOfUse from '../components/pages/t01-terms-of-use';
import AddProfileInfo from '../components/pages/t02-add-profile-info';
import RegisterMotorcycle from '../components/pages/t03-register-motorcycle';
import Welcome from '../components/pages/t04-welcome';
import Home from '../components/pages/t05-home';

const Stack = createNativeStackNavigator();


export default AppNavigationStack = () => {

    const [initializing, setInitializing] = useState(true);

    setTimeout(() => {
        setInitializing(false);
    }, 1000);

    if (initializing) return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );

    // if (!props.user) {
    if (!initializing) {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="LoginPage" component={LoginPage} />
                    <Stack.Screen name="PrivacyPolicies" component={PrivacyPolicies} />
                    <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
                    <Stack.Screen name="AddProfileInfo" component={AddProfileInfo} />
                    <Stack.Screen name="RegisterMotorcycle" component={RegisterMotorcycle} />
                    <Stack.Screen name="Welcome" component={Welcome} />
                    <Stack.Screen name="Home" component={Home} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

    // return (
    //     <NavigationContainer>
    //         <Stack.Navigator>

    //         </Stack.Navigator>
    //     </NavigationContainer>
    // );
};