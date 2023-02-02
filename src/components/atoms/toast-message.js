import { View } from 'react-native';
import Toast from 'react-native-toast-message';

import Text from './text';
import colors from '../../theme/colors';


export const TYPE = {
    SUCCESS: 'success',
    INFO: 'info',
    ERROR: 'error'
}

const CustomToast = ({ text1, type }) => {

    let background;
    switch (type) {
        case TYPE.SUCCESS:
            background = colors.success;
            break;
        case TYPE.INFO:
            background = colors.primary;
            break;
        case TYPE.ERROR:
            background = colors.danger;
            break;
        default:
            background = colors.primary;
            break;
    }

    return (
        <View style={{
            width: '100%',
            backgroundColor: background,
            padding: 12,
            flexWrap: 'nowrap',
            borderRadius: 8,
            borderColor: 'lightgray',
            borderWidth: 2,
            borderStyle: 'solid'
        }}>
            <Text paragraph size="lg" dark center lines={2} value={text1} />
        </View>
    )
}

export const toastConfig = {
    success: CustomToast,
    info: CustomToast,
    error: CustomToast
};

export const ToastMessage = (msg, type) => {
    Toast.show({
        type: type,
        text1: msg,
        style: type
    });
}