import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../components/pages/t04-welcome';
import Home from '../components/pages/passenger/home';
import RidesHistory from '../components/pages/t05-rides-history';
import Support from '../components/pages/t06-support';
import SendMessage from '../components/pages/t07-send-message';
import PrivacyPolicies from '../components/pages/t01-privacy-policies';
import TermsOfUse from '../components/pages/t01-terms-of-use';
import Settings from '../components/pages/t08-settings';;

const Stack = createNativeStackNavigator();


export default PassengerNavigationStack = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="RidesHistory" component={RidesHistory} />
                <Stack.Screen name="Support" component={Support} />
                <Stack.Screen name="SendMessage" component={SendMessage} />
                <Stack.Screen name="PrivacyPolicies" component={PrivacyPolicies} />
                <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
                <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};