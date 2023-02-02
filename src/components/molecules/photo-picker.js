import React from 'react';
import { StyleSheet, View } from 'react-native';

import Window from '../templates/window';
import IconButton from './icon-button';
import cameraIcon from '../../assets/images/camera.png';
import galleryIcon from '../../assets/images/gallery.png';
import { pickFromCamera, pickFromGallery } from '../../store/services/photo';


export default PhotoPicker = props => {
    return (
        <Window isVisible={props.isVisible} toggler={props.toggler} title="Onde está a foto?">

            <View style={styles.contentWrapper}>

                <IconButton light source={cameraIcon} size="md" label="Câmera"
                    onPress={() => props.toggler() + pickFromCamera(props.savePhoto)} />

                <IconButton light source={galleryIcon} size="md" label="Galeria"
                    onPress={() => props.toggler() + pickFromGallery(props.savePhoto)} />

            </View>

        </Window>
    )
}

const styles = StyleSheet.create({
    contentWrapper: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 15,
        justifyContent: 'space-evenly'
    }
});