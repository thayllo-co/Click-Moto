import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import Toast from 'react-native-toast-message';
import { toastConfig } from './src/components/atoms/toast-message';

import { Provider } from 'react-redux';
import store from './src/store/store';

import messaging from '@react-native-firebase/messaging';
import { messagingDisplayNotification, messagingRegisterApp } from './src/store/services/messaging';
import { saveNotification } from './src/store/actions/notifications';

messagingRegisterApp();
onNotificationReceived = async (message) => {
    messagingDisplayNotification(message?.notification?.title, message?.notification?.body);
    store.dispatch(saveNotification(message));
};
messaging().onMessage(onNotificationReceived);
messaging().setBackgroundMessageHandler(onNotificationReceived);

const ClickMotoApp = () => (
    <Provider store={store}>
        <App />
        <Toast config={toastConfig} />
    </Provider>
)


AppRegistry.registerComponent(appName, () => ClickMotoApp);
