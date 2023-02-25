import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../../components/pages/t04-welcome';
import Home from '../../components/pages/passenger/t05-home';
import { log } from '../../utils/logging';

const Stack = createNativeStackNavigator();


export default PassengerNavigationStack = () => {
    log.info("PassengerNavigationStack");
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};