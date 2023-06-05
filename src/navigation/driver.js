import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

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

const Stack = createNativeStackNavigator();


export default DriverNavigationStack = () => {

    const user = useSelector(state => state.user);

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