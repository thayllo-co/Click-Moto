import { Image } from 'react-native';
import pinIcon from '../../assets/images/pin.png';
import driverPinIcon from '../../assets/images/driver-pin.png';
import driverPackagePinIcon from '../../assets/images/driver-package-pin.png';
import driverPassengerPinIcon from '../../assets/images/driver-passenger-pin.png';


export default MapImageMarker = props => {

    let pinImage;

    switch (props?.type) {
        case "pin":
            pinImage = pinIcon;
            break;
        case "driver":
            pinImage = driverPinIcon;
            break;
        case "driver-pack":
            pinImage = driverPackagePinIcon;
            break;
        case "driver-pass":
            pinImage = driverPassengerPinIcon;
            break;
        default:
            pinImage = pinIcon;
            break;
    }

    return (
        <Image
            source={pinImage}
            style={{ height: 60, resizeMode: 'contain' }}
            resizeMode="contain"
        />
    );
};