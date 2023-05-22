import { StyleSheet, View } from 'react-native';

import Text from '../atoms/text';
import Image from '../atoms/image';
import userPhoto from '../../assets/images/user-photo.png';


export default PhotoForm = props => {
    return (
        <View style={styles.container}>

            <Image source={props.photoURL ? { uri: props.photoURL } : userPhoto} style={styles.userPhoto} />

            <Text paragraph link highlight center size="md" value="Editar foto" onPress={props.openPhotoPicker} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingTop: 8,
        paddingBottom: 8,
        alignItems: 'center'
    },
    userPhoto: {
        height: 125,
        width: 125,
        borderRadius: 150,
        overflow: 'hidden'
    }
});