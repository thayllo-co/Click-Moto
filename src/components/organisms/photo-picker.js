import { StyleSheet, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import Window from '../templates/window';
import IconButton from '../molecules/icon-button';
import cameraIcon from '../../assets/images/camera.png';
import galleryIcon from '../../assets/images/gallery.png';
import { ToastMessage, TT } from '../atoms/toast-message';
import { log } from '../../utils/logging';

const PHOTO_PICKER_OPTIONS = {
    width: 500,
    height: 500,
    cropping: true,
    cropperCircleOverlay: true,
    sortOrder: 'none',
    compressImageMaxWidth: 1000,
    compressImageMaxHeight: 1000,
    compressImageQuality: 1,
    compressVideoPreset: 'MediumQuality',
    includeExif: true,
    cropperStatusBarColor: 'black',
    cropperToolbarColor: 'black',
    cropperActiveWidgetColor: 'black',
    cropperToolbarWidgetColor: 'white',
};

export default PhotoPicker = props => {

    const pickFromGallery = () => {
        props.toggler();
        ImagePicker.openPicker(PHOTO_PICKER_OPTIONS)
            .then((image) => {
                log.success("📸 pickFromGallery() ", image);
                props.handleSubmitPhoto(image.path);
            })
            .catch((error) => {
                ToastMessage("⚠️ Ocorreu um erro ao selecionar a imagem", TT.ERROR);
                log.error("📸 pickFromGallery() ", error);
            });
    }

    const pickFromCamera = () => {
        props.toggler();
        ImagePicker.openCamera(PHOTO_PICKER_OPTIONS)
            .then((image) => {
                log.success("📸 pickFromCamera() ", image);
                props.handleSubmitPhoto(image.path);
            })
            .catch((error) => {
                ToastMessage("⚠️ Ocorreu um erro ao selecionar a imagem", TT.ERROR);
                log.error("📸 pickFromCamera() ", error);
            });
    };


    return (
        <Window isVisible={props.isVisible} toggler={props.toggler} title="Onde está a foto?">

            <View style={styles.contentWrapper}>

                <IconButton light source={cameraIcon} size="md" label="Câmera" onPress={pickFromCamera} />

                <IconButton light source={galleryIcon} size="md" label="Galeria" onPress={pickFromGallery} />

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