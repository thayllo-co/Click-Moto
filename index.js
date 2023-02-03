import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import Toast from 'react-native-toast-message';
import { toastConfig } from './src/components/atoms/toast-message';

import { Provider } from 'react-redux';
import store from './src/store/store';


const ClickMotoApp = () => (
    <Provider store={store}>
        <App />
        <Toast config={toastConfig} />
    </Provider>
)


AppRegistry.registerComponent(appName, () => ClickMotoApp);
