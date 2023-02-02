import ImagePicker from 'react-native-image-crop-picker';

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
}

export const pickFromGallery = (successCallback) => {
    ImagePicker.openPicker(PHOTO_PICKER_OPTIONS)
        .then((image) => {
            successCallback(image.path);
        })
        .catch((e) => {
            console.log(e);
        });
}

export const pickFromCamera = (successCallback) => {
    ImagePicker.openCamera(PHOTO_PICKER_OPTIONS)
        .then((image) => {
            successCallback(image.path);
        })
        .catch((e) => {
            console.log(e);
        });
};
