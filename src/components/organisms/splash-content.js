import { StyleSheet, View } from 'react-native';

import Image from '../atoms/image';
import logo from '../../assets/images/logo.png';
import LoadingIndicator from '../atoms/progress-indicator';


export default SplashContent = () => (
    <View>

        <Image source={logo} style={styles.image} />

        <LoadingIndicator style={styles.loading} />

    </View>
);

const styles = StyleSheet.create({
    image: {
        height: 400,
        marginTop: 100
    },
    loading: {
        alignSelf: 'center',
        marginTop: 50
    }
});