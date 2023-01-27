import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../components/pages/splash-screen';
import LoginPage from '../components/pages/login';

const Stack = createNativeStackNavigator();


export default AppNavigationStack = () => {

    const [initializing, setInitializing] = useState(true);

    // TESTAR USANDO NAVIGATE
    // setTimeout(() => {
    //     setInitializing(false);
    // }, 1000);

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