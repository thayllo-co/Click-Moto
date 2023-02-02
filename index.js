import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import Toast from 'react-native-toast-message';
import { toastConfig } from './src/components/atoms/toast-message';


const ClickMotoApp = () => (
    <>
        <App />
        <Toast config={toastConfig} />
    </>
)


AppRegistry.registerComponent(appName, () => ClickMotoApp);
