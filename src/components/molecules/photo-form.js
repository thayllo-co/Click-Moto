import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Text from '../atoms/text';
import Image from '../atoms/image';
import userPhoto from '../../assets/images/user-photo.png';
import PhotoPicker from './photo-picker';


export default PhotoForm = props => {

    const [isPhotoPickerVisible, setIsPhotoPickerVisible] = useState(false);

    togglePhotoPicker = () => setIsPhotoPickerVisible(!isPhotoPickerVisible);

    return (
        <View style={styles.container}>

            <Image source={props.photo || userPhoto} style={styles.userPhoto} />

            <Text paragraph link highlight center size="md" value="Editar foto" onPress={togglePhotoPicker} />

            <PhotoPicker isVisible={isPhotoPickerVisible} toggler={togglePhotoPicker} savePhoto={props.savePhoto} />

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
    }
});